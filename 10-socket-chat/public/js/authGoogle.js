// References HTMLI Elements
const myForm = document.querySelector('form');

const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:3000/api/auth/'
  : 'https://curso-nodefh.herokuapp.com/api/auth/';

myForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {};

  for (const element of myForm) {
    if (element.name.length > 0) formData[element.name] = element.value;
  }
  fetch(url + 'login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then(({ msg, token }) => {
      if (msg) return console.error(msg);

      localStorage.setItem('token', token);
    })
    .catch((error) => console.log(error));
});

// <DOC Google>
function onSignIn(googleUser) {
  // const profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  const id_token = googleUser.getAuthResponse().id_token;
  const data = { id_token };
  // <DOC Google />

  fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const { token } = data;
      localStorage.setItem('token', token);
    })
    .catch(console.log);
}

// <DOC Google>
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
// <DOC Google />
