
function missingLogin(){
  const emailField = document.querySelector('.email-form');
  const passwordField = document.querySelector('.password-form');

  if (emailField.value == '' || passwordField.value == ''){
    document.querySelector('.alert-area').innerHTML = `
    <div class="alert alert-light" role="alert">
     Enter Email & Password
    </div>
    `;
  }
}
