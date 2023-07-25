const Annoucement = (title, message, topic, author) => {
    return {
        Title: title,
        Message: message,
        Topic: topic,
        Author: author,
        createdAt: new Date().toUTCString(),
    }
}
module.exports = Annoucement