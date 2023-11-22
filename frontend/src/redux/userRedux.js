
import {createSlice} from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isfetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isfetching=true
        },
        loginSuccess:(state,action)=>{
            state.isfetching=false;
            state.currentUser=action.payload
        },
        loginFailure:(state)=>{
            state.isfetching=false;
            state.error=true;
        },
    }
});


export const {loginStart,loginSuccess,loginFailure}=userSlice.actions
export default userSlice.reducer;