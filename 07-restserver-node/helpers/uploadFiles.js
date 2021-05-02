const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  validateExtension = ['png', 'jpg', 'jpeg', 'gif'],
  folder = ''
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const cutName = file.name.split('.');
    const extension = cutName[cutName.length - 1];

    // Validate extension
    if (!validateExtension.includes(extension))
      return reject(
        `This extension '${extension}' not is permited, Examples: ${validateExtension}`
      );

    const saveNameFile = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, '../uploads/', folder, saveNameFile);

    file.mv(uploadPath, (error) => {
      if (error) return reject(error);

      resolve(saveNameFile);
    });
  });
};

module.exports = { uploadFile };
