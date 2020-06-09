//#region Custom components
//#endregion

var form = document.getElementById('loginForm');
form.addEventListener('submit', event => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(username.value, password.value).then(() => {
        if(history.length > 0) {
            history.back();
        } else {
            window.location.pathname = '/index.html';
        }
    });
});

firebase.auth().onAuthStateChanged(user => {
    if(!Utils.isEmpty(user)) {
        window.location.pathname = '/index.html';
    }
});

var username = document.getElementById('username');
var password = document.getElementById('password');
var showPassword = document.getElementById('showPassword');
showPassword.addEventListener('change', event => {
    if(event.target.checked) {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
});

var formButtonContainer = document.createElement('div');
formButtonContainer.classList.add('form-buttons');

var cancelButton = document.createElement('app-button');
cancelButton.text = 'Sign Up';
cancelButton.invisible = true;
cancelButton.click = () => history.back();

var loginButton = document.createElement('app-button');
loginButton.type = 'submit'
loginButton.text = 'Login';

formButtonContainer.appendChild(cancelButton);
formButtonContainer.appendChild(loginButton);

form.appendChild(formButtonContainer);