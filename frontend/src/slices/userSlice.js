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

export const login = createAsyncThunk('user/login', async(user, thunkApi) => {
    try {
        const { data } = await axios.post("/api/user/login", user)
        if (data) {
            localStorage.setItem('user', JSON.stringify(data))
        }
        return data
    } catch (err) {
        const errMsg = (err.response && err.response,data && err.response.data.message) || err.message || err.toString()
        return thunkApi.rejectWithValue(errMsg)
    }
})
// export const logout = createAsyncThunk('user/logout', async(user, thunkApi) => {
//     try {
//         const { data } = await post("/api/user/logout")
//         if(data) return localStorage.removeItem('user')
//     } catch (err) {
//         const errMsg = (err.response && err.response,data && err.response.data.message) || err.message || err.toString()
//         return thunkApi.rejectWithValue(errMsg)
        
//     }
// })
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        },
        logout: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message= action.payload
            state.user = null
            localStorage.removeItem('user')
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
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        // builder.addCase(logout.pending, (state, action) => {
        //     state.isLoading = true
        // })
        // builder.addCase(logout.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     state.isSuccess = true
        //     state.user = action.payload
        // })
        // builder.addCase(logout.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.isError = true
        //     state.message = action.payload
        // })
        
    } 
})

export default userSlice.reducer
export const {reset, logout} = userSlice.actions 
