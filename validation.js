const form = document.getElementById('form')
const username_input = document.getElementById('username-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')
const forgot_form = document.getElementById('forgot-form')
const fp_username_input = document.getElementById('fp-username-input')
const fp_current_password_input = document.getElementById('fp-current-password-input')
const fp_new_password_input = document.getElementById('fp-new-password-input')

if (form) {
  form.addEventListener('submit', (e) => {
    let errors = []

    if(username_input && email_input && repeat_password_input){
      // If we have all signup fields then we are in the signup
      errors = getSignupFormErrors(username_input.value, email_input.value, 
                         password_input.value, repeat_password_input.value)
    }
    else{
      // If we don't have all signup fields then we are in the login
      errors = getLoginFormErrors(username_input.value, password_input.value)
    }

    if(errors.length > 0){
      // If there are any errors
      e.preventDefault()
      error_message.innerText = errors.join(". ")
    }
  })
}

function getSignupFormErrors(username, email, password, repeatPassword){
  let errors = []

  if(username === '' || username == null){
    errors.push('Username is required')
    username_input.parentElement.classList.add('incorrect')
  }

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }

  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }

  if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }
  return errors;
}

function getLoginFormErrors(username, password){
  let errors = []

  if(username === '' || username == null){
    errors.push('Username is required')
    username_input.parentElement.classList.add('incorrect')
  }

  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  return errors;
}

const allInputs = [username_input, email_input,
      password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
if (forgot_form) {
  forgot_form.addEventListener('submit', (e) => {
    let errors = []
    // Remove previous error highlights
    [fp_username_input, fp_current_password_input, fp_new_password_input].forEach(input => {
      if (input && input.parentElement.classList.contains('incorrect')) {
        input.parentElement.classList.remove('incorrect')
      }
    })
    if (!fp_username_input.value) {
      errors.push('Username is required')
      fp_username_input.parentElement.classList.add('incorrect')
    }
    if (!fp_current_password_input.value) {
      errors.push('Current password is required')
      fp_current_password_input.parentElement.classList.add('incorrect')
    }
    if (!fp_new_password_input.value) {
      errors.push('New password is required')
      fp_new_password_input.parentElement.classList.add('incorrect')
    }
    if (fp_new_password_input.value && fp_new_password_input.value.length < 8) {
      errors.push('New password must have at least 8 characters')
      fp_new_password_input.parentElement.classList.add('incorrect')
    }
    if (errors.length > 0) {
      e.preventDefault()
      document.getElementById('error-message').innerText = errors.join('. ')
    }
  })
  [fp_username_input, fp_current_password_input, fp_new_password_input].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
          input.parentElement.classList.remove('incorrect')
          document.getElementById('error-message').innerText = ''
        }
      })
    }
  })
}
