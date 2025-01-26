

export default class ChatMessage{
    constructor ({
        senderName,
        messageBody,
        timestamp,
        senderImageUrl = null,
    }){
        this.senderName = senderName
        this.messageBody = messageBody
        this.timestamp = timestamp
        this.senderImageUrl = senderImageUrl
    }
}