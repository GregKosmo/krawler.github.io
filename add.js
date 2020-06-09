//#region Custom components
//#endregion

var formButtonContainer = document.createElement('div');
formButtonContainer.classList.add('form-buttons');

var cancelButton = document.createElement('app-button');
cancelButton.text = 'Cancel';
cancelButton.invisible = true;
cancelButton.click = () => history.back();

var loginButton = document.createElement('app-button');
loginButton.type = 'submit'
loginButton.text = 'Start';

formButtonContainer.appendChild(cancelButton);
formButtonContainer.appendChild(loginButton);

document.getElementById('addForm').appendChild(formButtonContainer);