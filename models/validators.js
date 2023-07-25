// The passwordValidator is used to validate passwords. 
// If checks the parameter (password) to see if it is longer than eight characters, and has a mix of letters numbers and symbols.
const passwordValidator = (password) => {
    // let isLongEnough = /.{8,}/;
    let hasUpper = /[A-Z]/;
    let hasLower = /[a-z]/;
    let hasNumber = /[0-9]/;
    let hasSpecialChar = /[\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\<\>\?\,\.\/\~\`]/;
    if(password.length > 8 && hasUpper.test(password) && hasLower.test(password) && hasNumber.test(password) && hasSpecialChar.test(password)){
        return true;
    }
    else {
        return false;
    }
}

// The generalValidator can validate either usernames or topics
// It first checks that the username/topic has at least one character, then makes sure it is unique in the database
const generalValidator = (string, database) => {
    if(string.length <= 0) {
        return false;
    }
    if(database.collection.find(string).length > 0 ){
        return false;
    }
    return true;
}

module.exports = {
    passwordValidator,
    generalValidator
};