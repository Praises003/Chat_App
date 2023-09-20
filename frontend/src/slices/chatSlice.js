import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    // chat: localStorage.getItem('chat') ? JSON.parse(localStorage.getItem("chat")): [],
    chat: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// export const chats = createAsyncThunk('chat/chats', async(chat, thunkApi) => {
//     try {
//         const { data } = await axios.post(`/api/chat/`, chat)
//         return data
//     } catch (error) {
//         const errMsg = (error.response && error.response,data && error.response.data.message) || error.message || error.toString()
//         return thunkApi.rejectWithValue(errMsg)      
//     }
// })

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers:{
         chats: (state, action) => {
             state.chat = action.payload
            localStorage.setItem('chat', JSON.stringify(action.payload))

         }
    },
    // extraReducers: (builder) =>{
    //     builder.addCase(chats.pending, (state) => {
    //         state.isLoading = true
    //     })
    //     builder.addCase(chats.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true
    //         //state.chat = state.chat.concat(action.payload)
    //         state.chat= [...state.chat, action.payload]
    //         console.log(state.chat)
        
    //     })
    //     builder.addCase(chats.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true
    //         state.message = action.payload
    //         state.chat = []
    //     })
    // }
})



export default chatSlice.reducer
export const {chats} = chatSlice.actions 
