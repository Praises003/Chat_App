import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    // singleChat:localStorage.getItem('singleChat') ? JSON.parse(localStorage.getItem("singleChat")): "",
    singleChat: "",
    onError: false,
    onSuccess: false,
    onLoading: false,
    onMessage: ""
}

// export const singleChats = createAsyncThunk('chat/singleChat', async(chat, thunkApi) => {
//     try {
//         const { data } = await axios.post(`/api/chat/`, chat)
//         return data
//     } catch (error) {
//         const errMsg = (error.response && error.response,data && error.response.data.message) || error.message || error.toString()
//         return thunkApi.rejectWithValue(errMsg)      
//     }
// })

const singleChatsSlice = createSlice({
    name: "singleChat",
    initialState,
    reducers:{
        singleChats: (state, action) => {
            state.singleChat = action.payload
            localStorage.setItem('singleChat', JSON.stringify(action.payload))
        }
    },
    // extraReducers: (builder) =>{
    //     builder.addCase(singleChats.pending, (state) => {
    //         state.isLoading = true
    //     })
    //     builder.addCase(singleChats.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true
    //         state.singleChat = action.payload
        
    //     })
    //     builder.addCase(singleChats.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true
    //         state.message = action.payload
    //         state.singleChat = ""
    //     })
    // }
})



export default singleChatsSlice.reducer
export const {singleChats} = singleChatsSlice.actions 
