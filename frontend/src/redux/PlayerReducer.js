import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayer = createAsyncThunk('user/fetchPlayer', async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/player', {
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

export const fetchUpdateInfo = createAsyncThunk('auth/fetchUpdateInfo', async (userInfo) => {
    const {email, fname, lname, token} = userInfo
    try {
        // const response = await axios.post('http://127.0.0.1:8000/api/player/update-info', userInfo)
        const response = await axios.post('http://127.0.0.1:8000/api/player/update-info', {email, fname, lname} ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('fetech update-info: ', response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchUpdatePassword = createAsyncThunk('auth/fetchUpdatePassword', async (userPass) => {
    const {password, newPassword, token} = userPass
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/player/update-password', {password, newPassword} ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('fetech update-password: ', response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})






const PlayerReducer = createSlice({
    name: 'player',
    initialState: {
        status: null,
        player: null,
        loadingInfo: false,
        loadingPass: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Player
            .addCase(fetchPlayer.fulfilled, (state, action) => {
                state.player = action.payload
            })

            // Fetch Update Info
            .addCase(fetchUpdateInfo.fulfilled, (state, action) => {
                state.player = action.payload.player
                state.loadingInfo = false
            })
            .addCase(fetchUpdateInfo.pending, (state) => {
                state.loadingInfo = true
            })

            // Fetch Update Password
            .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
                if(action.payload.player) {
                    state.player = action.payload.player
                }
                state.loadingPass = false

            })
            .addCase(fetchUpdatePassword.pending, (state) => {
                state.loadingPass = true
            })


    }
})




export default PlayerReducer.reducer