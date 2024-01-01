// globalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  material_type:[],
  send_data:
    {
      material:[],
      remark:"",
      due:"",
      payment_type:"",
      total_amount:0, 
      photo:[],
      type :  '',
      id : '',
    }
  ,
  wizardObj: {
    currentStep: 'material',
    index:0,
    success:{
      documents:false,
      exterior:false,
      interior:false,
      engine:false,
      other:false,
    },
    successStep:-1,
  },
  profileDetails:{

  },
  userDetails:{

  },
  complaint:0,
  AMC:0,
};

export const GlobalSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    isLoggedIn: (state,action) => {
      state.isUserLoggedIn = action.payload;
    },
    setWizardCurrentStep: (state, action) => {
      state.wizardObj.currentStep = action.payload.currentStep;
      state.wizardObj.index = action.payload.index;
    },
    setProfileDetails:(state,action)=>{
      state.profileDetails = action.payload
    },
    setUserDetails:(state,action)=>{
      state.userDetails = action.payload
    },
    setComplaintsBadge:(state,action)=>{
      state.complaint = action.payload;
    },
    setAMCBadge:(state,action)=>{
      state.AMC = action.payload;
    },
    setSendData:(state,action)=>{
      // console.log("redux => ",action.payload)
      state.send_data = action.payload;
    },
    setMaterialType:(state,action)=>{
      state.material_type = action.payload
    }
  },
});

export const { isLoggedIn, setWizardCurrentStep,setProfileDetails ,setUserDetails,setAMCBadge,setComplaintsBadge,setSendData,setMaterialType} = GlobalSlice.actions;

export default GlobalSlice.reducer;
