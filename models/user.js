function User(username, password, firstName, lastName, role) {
    return {
        Username: username,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        Role: role,
    }
}
module.exports = User