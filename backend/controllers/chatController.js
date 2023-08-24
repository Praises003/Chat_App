const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');


const createChat = asyncHandler(async(req, res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("UserId")
    }

    let singleChat = await Chat.find({
        groupChat: false,
        $and: [
            { users: {$elemMatch: {$eq: req.user._id}}},
            {users: { $elemMatch: {$eq: userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage")

    singleChat = await User.populate(singleChat, {
        path: "latestMessage.sender", 
        select: "name email picture"
    }) 

    //let test =  await User.populate(currentChat, path:)

    if (singleChat.length > 0) {
        res.send(singleChat[0])
    } else {
        let singleChatData = {
            chatName: "name",
            groupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(singleChatData)

            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
            res.status(200).json({
                fullChat})
        } catch (err) {
            res.status(400)
            throw new Error(err.message)
        }
    }
}) 

const getChats = asyncHandler(async(req, res) => {
    let getChat = await Chat.find({users: {$elemMatch: { $eq : req.user._id}}}).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 })

    getChat = await User.populate(getChat, {
        path: "latestMessage.sender",
        select: "name email picture" 
    })

    try {
        if(getChat) {
            res.status(200).json({ getChat })

    } 

    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }

    

    
})


const createGroupChat = asyncHandler(async(req, res) => {
    if (!req.body.users || !req.body.name) return res.status(400).send("Please Fill All The Fields")

    let selectedUsers = JSON.parse(req.body.users)

    if(selectedUsers.length < 2) {
        return res.status(400).send("Atleast two users are required to create a group chat")
    }

    // Add the currently logged in user
    selectedUsers.push(req.user)

    try {
         newGroupChat = await Chat.create({
            chatName: req.body.name,
            users: selectedUsers,
            groupChat: true,
            groupAdmin: req.user
        })

       const groupChat = await Chat.findOne({_id: newGroupChat._id}).populate("users", "-password").populate("groupAdmin", "-password")
       res.status(200).json({
        groupChat
       })
    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }
})


const renameGroup = asyncHandler(async(req, res) => {
    const { chatId , chatName} = req.body

    const renamedChat = await Chat.findByIdAndUpdate(chatId, {
        chatName
    }, {
        new: true
    }).populate("users", "-password").populate("groupAdmin", "-password")

    if(!renamedChat) {
        res.status(404);
        throw new Error("Chat")
    } else {
        res.status(201).json(updatedChat)
    }
})


const addUserToGroup =  asyncHandler(async(req, res) => {
    const { chatId, userId} = req.body;

    const addedUser = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId}
    }, {
        new: true
    }).populate("users", "-password").populate("groupAdmin", "-password")

    
    if (!addedUser) {
    res.status(404)
    throw new Error("Chat Not Found")
    } else {
    res.status(201).json(addedUser)
    }
})
    

const removeUserFromGroup =  asyncHandler(async(req, res) => {
    const { chatId, userId} = req.body

    const removedUser = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId}
    }, {
        new: true
    }).populate("users", "-password").populate("groupAdmin", "-password")

    if (!removedUser) {
        res.status(404)
        throw new Error("Chat Not Found")
    } else {
        res.status(201).json(removedUser)
    }
})




module.exports = {createChat, getChats, createGroupChat, renameGroup, addUserToGroup, removeUserFromGroup}