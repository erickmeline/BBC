const options = ['lowercase', 'uppercase', 'numeric', 'symbol'];
const generateBtn = document.querySelector("#generate");

/**
 * Add event listener to generate button
 */
generateBtn.addEventListener("click", writePassword);


/**
 * Write password to the #password input
 */
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  if (password) {
    passwordText.value = password;
  }
}

/**
 * Generate random passwd based on inputs from: getLength, getOptions
 * @returns passwd or fails gracefully
 */
function generatePassword() {
  const passwordLength = getLength();
  if (passwordLength) {
    const passwordOptions = getOptions();
    if (passwordOptions) {
      const lowers = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_{}][?><:;=';
      let chars = '';
      let passwd = '';
      if (passwordOptions.includes('lowercase')) {
        chars += lowers;
      }
      if (passwordOptions.includes('uppercase')) {
        chars += lowers.toUpperCase();
      }
      if (passwordOptions.includes('numeric')) {
        chars += numbers;
      }
      if (passwordOptions.includes('symbol')) {
        chars += symbols;
      }
      chars = chars.split('');
      for (let i = 0; i < 128; i++) {
        const random = Math.floor(Math.random() * chars.length);
        passwd += chars[random];
      }
      return passwd.substring(0, passwordLength);
    }
  }
}

/**
 * Get user input length
 * @returns inputLength or alerts error
 */
function getLength() {
  let inputLength = prompt('How many characters would you like you new password to be?');
  if (inputLength) {
    inputLength = inputLength.match(/\d/) ? Number(inputLength) : 0;
    if (inputLength > 7 && inputLength < 129) {
      return inputLength;
    }
    else {
      alert('Error: Please input a numeric value in the range of 8 - 128');
    }
  }
}

/**
 * Get user input options
 * @returns inputOptions or alerts error
 */
function getOptions() {
  const inputOptions = [];
  for (let i = 0; i < options.length; i++) {
    const inputOption = confirm(`Include ${options[i]} characters?`);
    if (inputOption) {
      inputOptions.push(options[i]);
    }
  }
  if (inputOptions.length) {
    return inputOptions;
  }
  else {
    alert(`Error: At least one character type (${options.toString()}) should be selected`);
  }
}
