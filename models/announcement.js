function Annoucement(title, message, topic, author) {
    return {
        title: title,
        message: message,
        topic: topic,
        author: author,
        createdAt: new Date().toUTCString(),
    }
}
module.exports = Annoucement