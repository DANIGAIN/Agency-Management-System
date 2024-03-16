import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
let data =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';

const initialState = {
  loading: false,
  error: null,
  data ,
};
export const getUserDetails = createAsyncThunk('auth', async()=>{
    return fetch('/api/users/profile').then(state => state.json())
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getUserDetails.pending ,(state) =>{
            state.loading = true;
        })
        .addCase(getUserDetails.fulfilled , (state , action) =>{
            state.data = action.payload;
            state.error = null ;
            state.loading = false ;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(getUserDetails.rejected , (state , action) =>{
            state.data = '',
            state.error = action.payload ;
            state.loading = false;
        })
    }
});

export const { logOut , login} = authSlice.actions;
export default authSlice.reducer;