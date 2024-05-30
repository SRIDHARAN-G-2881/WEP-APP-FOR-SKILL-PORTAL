import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    currentuser:null,
    error:null,
    loading:false
  }
  
 const userslice  = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInstart:(state)=>{
        state.loading=true;
        state.error=null;
      },
      signInsuccess:( state,action)=>{
        state.currentuser=action.payload;
        state.loading=false;
        state.error=null;
      },
      signInfailer:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      },
      signOutsuccess:(state,action)=>{
        state.currentuser=action.payload;
        state.loading=false;
        state.error=null;
      }
    },
});
export const {signInsuccess,signInfailer,signInstart,signOutsuccess} = userslice.actions;
export default userslice.reducer;

        
