function User(username, password, firstName, lastName, role) {
    return {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: "USER" | "MODERATOR" | "ADMIN",
    }
}
module.exports = User