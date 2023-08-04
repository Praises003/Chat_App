import { configureStore, } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import chatReducer, { chats } from './slices/chatSlice'
import singleChatReducer, { singleChats } from './slices/singleChatSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        singleChat:singleChatReducer
    },
    devTools:true
})
//store.dispatch(singleChats('64abfd0348f9459cc832adf2'))
//store.dispatch(chats(['64abfd0348f9459cc832adf2']))
export default store;