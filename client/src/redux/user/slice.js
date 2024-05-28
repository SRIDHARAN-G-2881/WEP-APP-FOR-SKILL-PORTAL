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
      signInsucess:( state,action)=>{
        state.currentuser=action.payload;
        state.loading=false;
        state.error=null;
      },
      signInfailer:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      },
    },
});
export const {signInsuccess,signInfailer,signInstart} = userslice.actions;
export default userslice.reducer;

        
