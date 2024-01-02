import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/Style'
// const BASE_URL = 'https://aqua.kingsmenapparels.com/api/'
export  const login = async({email,password}) => {
    // console.log("agya")

    let response ={
        error:'',
        data:{},
    };
    try{
         response.data = await axios.post(
           BASE_URL+'login',
            {
                email:email,
                password:password,
            }
          );
          console.log('data =>',response.data.data)
          return response;
    }
    catch(error){
      console.log('error =>',error)

        response.error = error
        return response;
    }
  
}

export  const allInspection = async({id ,status}) => {
// console.log("agya")
  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'allbranches'
          // {
          //     user_id:id,
          //     status:status,
          // }
        );
        // console.log("res > ",response)
      return response;
     
  }
  catch(error){
    console.log("err > ",error)
      response.error = error
      return response;
  }
}
export  const getAllotedInventory = async({id}) => {
  // console.log("agya")
    let response ={
        error:'',
        data:{},
    };
    try{
         response.data = await axios.post(
            BASE_URL+'allotedinventory',
            {
                tech_id:id,
            }
          );
          // console.log("res > ",response.data.data)
        return response;
       
    }
    catch(error){
      console.log("err > ",error)
        response.error = error
        return response;
    }
  }
export  const getRemarkHistory = async({id,type}) => {
  // console.log("agya")
    let response ={
        error:'',
        data:{},
    };
    try{
         response.data = await axios.post(
            BASE_URL+'remarkhistory',
            {
              sr_id:id,
              type:type
            }
          );
          // console.log("res from api call =>",response.data.data)
        return response;
       
    }
    catch(error){
        response.error = error
        return response;
    }
  }
export  const getAMC = async({id ,status}) => {

  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'alljobs',
          {
            user_id:id,
            status:status,
          }
        );
      // console.log('get AMC  =>',response.data)
      return response;
     
  }
  catch(error){
    response.error = error
      return response;
  }
}
export  const submitForm = async({data:data}) => {

  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'step3',
          data
        );
      console.log('get response api  =>',response.data.data)
      return response;
     
  }
  catch(error){
    console.log("error  =>",error)
    response.error = error
      return response;
  }
}



