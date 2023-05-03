import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading:false,
    users:[],
    error:''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers',async()=>{
    return axios.get('https://fakestoreapi.com/products')
        .then(response=>response.data)
        
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.users=[]
            state.error=action.error.message
        })
    }
})


export default userSlice.reducer
