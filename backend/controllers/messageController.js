const asyncHandler = require("express-async-handler")
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const Chat = require("../models/chatModel")

const createMessage = asyncHandler(async(req, res) => {
    const { chatId, message} = req.body

    if(!chatId || !message) {
        return res.sendStatus(400)
    }

    let createdMessage = {
        sender: req.user._id,
        message,
        chat: chatId
        
    }

    try {
        let message = await Message.create(createdMessage)

         message = await message.populate("sender", "name picture")
         message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users", 
            select: "name picture email"
        }) 

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })
        res.send(message)
    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }
})

const getMessage = asyncHandler(async(req, res) => {
    try {
        const messages = await Message.find({chat: req.params.chatId}).populate("sender", "name picture email").populate("chat");
        res.status(200).send(messages)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

module.exports = { createMessage, getMessage }