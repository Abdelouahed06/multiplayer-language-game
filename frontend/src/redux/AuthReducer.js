import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchLanguages = createAsyncThunk('auth/fetchLanguages', async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/languages')
        console.log('fetch languages: ', response.data.languages)
        return response.data.languages
    } catch (err) {
        console.log(err)
    }
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (userInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/player/register', userInfo)
        console.log('fetech register: ', response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (userInfo) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/player/login', userInfo)
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



const AuthReducer = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        languages: [],
        resp: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Languages:
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.languages = action.payload
            })

            // Fetch Player Register:
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.resp = action.payload
                if(action.payload.token) {
                    console.log('if token: ', action.payload.token)
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                    window.location.href = '/'
                }
            })

             // Fetch Player Login:
             .addCase(fetchLogin.fulfilled, (state, action) => {
                state.resp = action.payload
                if(action.payload.token) {
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                    window.location.href = '/'
                } 
            })

            // Fetch Player Logout:
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.resp = null
                localStorage.removeItem('token')
                window.location.href = '/login';

            })
    }
})




export default AuthReducer.reducer