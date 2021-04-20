const readline = require('readline');
const csvtojson = require('csvtojson');
require('dotenv').config();

const User = require('../models/user.model');
const encryptPass = require('../helpers/bcryptjs');

// Init Script from (root '/')
const { dbConnection } = require('./mongoose.config');

const initDatabase = async () => {
  try {
    console.log('Emptying asteroids and users collection...');

    // Delete all Users
    await User.deleteMany();

    console.log('Data successfully deleted!');
    console.log('Creating Users...');

    // Read CSV file with asteroids
    const databasesToInit = ['Users'];

    for (let i = 0; i < databasesToInit.length; i++) {
      const element = databasesToInit[i];

      await csvtojson()
        .fromFile(`./database/${element}.csv`)
        .then(async (item) => {
          for (let i = 0; i < item.length; i++) {
            item[i].password = encryptPass(item[i].password);
          }

          await User.create(item);

          console.log(`Data successfully loaded!. ${item.length} have been created.`);
        });
    }
  } catch (error) {
    console.log(`There was an error!: ${error}`);
    process.exit(1);
  }
};

const askUser = (askText) => {
  return new Promise((resolve, reject) => {
    const readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(askText, (userResponse) => {
      readLine.close();
      resolve(userResponse);
    });
  });
};

const connectDB = async () => {
  try {
    // Open ConnectDb Mongo
    await dbConnection();

    // Ask to initialize DB
    const response = await askUser('Are you sure to initialize DB? (no/yes) ');

    if (response.toLowerCase() !== 'yes' && response.toLowerCase() !== 'y') {
      console.log('Process aborted!');
      return process.exit();
    }

    await initDatabase();

    // close connection
    process.exit();
  } catch (error) {
    console.log(`There was an error!: ${error}`);
    process.exit(1);
  }
};

connectDB();
