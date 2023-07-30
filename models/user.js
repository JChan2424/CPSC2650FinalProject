function User(username, password, firstName, lastName, role) {
    return {
        username: username,
        password: password,
        role: "USER" | "MODERATOR" | "ADMIN",
    }
}
module.exports = User