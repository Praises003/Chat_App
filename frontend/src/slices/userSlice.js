import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const register = createAsyncThunk('user/register', async(user, thunkApi) => {
    try {
        const { data } = await axios.post("/api/user", user)

        if (data) {
            localStorage.setItem('user', JSON.stringify(data))
        }

        return data

    } catch(err) {
        const errMsg = (err.response && err.response,data && err.response.data.message) || err.message || err.toString()
        return thunkApi.rejectWithValue(errMsg)

    }
})

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        
    } 
})

export default userSlice.reducer
export const {reset} = userSlice.actions 
