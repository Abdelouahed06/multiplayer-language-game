import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (userInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/admin/login', userInfo)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async (token) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/logout', {} ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('logout: ', response.data)
        return response.data;
    } catch (err) {
        console.log(err)
    }
})

export const fetchPlayer = createAsyncThunk('user/fetchPlayer', async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('player', response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})


const AuthReducer = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        resp: null,
        player: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Player
            .addCase(fetchPlayer.fulfilled, (state, action) => {
                state.player = action.payload
            })
            

             // Fetch Admin Login:
             .addCase(fetchLogin.fulfilled, (state, action) => {
                state.resp = action.payload
                if(action.payload.token) {
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                    window.location.href = '/'
                } 
            })

            // Fetch Admin Logout:
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.resp = null
                localStorage.removeItem('token')
                window.location.href = '/login';

            })
    }
})




export default AuthReducer.reducer