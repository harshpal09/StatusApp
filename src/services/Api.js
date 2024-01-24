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
            BASE_URL+'branchjobs',
            {
                branch_id:id,
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
export  const getAdminJobs = async() => {

  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'alljobs'
        );
      // console.log('get AMC  =>',response.data)
      return response;
     
  }
  catch(error){
    response.error = error
      return response;
  }
}
export  const getDetailJob = async({id}) => {
  // console.log("id -> ",id)
  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'detailjob',
          {
            job_id:id,
          }
        );
      // console.log('get AMC  =>',response.data.data)
      return response;
     
  }
  catch(error){
    response.error = error
      return response;
  }
}
export  const getFieldJobs = async({id }) => {
  // console.log("id -> ",id)
  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'feildofficerjobs',
          {
            officer_id:id,
          }
        );
      // console.log('get AMC  =>',response.data.data)
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
          BASE_URL+'branchvisit',
          data
        );
      // console.log('get response api  =>', BASE_URL+'feildofficerjobs')
      return response;
     
  }
  catch(error){
    console.log("error  =>",error)
    response.error = error
      return response;
  }
}
export  const submitFormStartWorking = async({data:data}) => {

  let response ={
      error:'',
      data:{},
  };
  try{
       response.data = await axios.post(
          BASE_URL+'startworking',
          data
        );
      // console.log('get response api  =>', BASE_URL+'feildofficerjobs')
      return response;
     
  }
  catch(error){
    console.log("error  =>",error)
    response.error = error
      return response;
  }
}



