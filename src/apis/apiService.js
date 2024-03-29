/**
 * @author Nadir
 * @version 1.0
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "./serviceConstants";

const apiPOST = async (api,body)=>{
    const res =  await fetch(`${BASE_URL}/${api}`,{ 
         method:"POST",
         headers:{
             'Accept': 'application/json',
             "Content-Type":"application/json",
             "Authorization":await AsyncStorage.getItem('token')
         },
         body:JSON.stringify(body)
     })
     
     return await res.json()
}
 
const apiGET = async (api)=>{
    const res =  await fetch(`${BASE_URL}/${api}`,{
         headers:{
             "Content-Type":"application/json",
             "Authorization":await AsyncStorage.getItem('token')
         }
     })
     return await res.json()
}

const apiPUT = async (api,body)=>{
    const res =  await fetch(`${BASE_URL}/${api}`,{ 
         method:"PUT",
         headers:{
             'Accept': 'application/json',
             "Content-Type":"application/json",
             "Authorization":await AsyncStorage.getItem('token')
         },
         body:JSON.stringify(body)
     })
     
     return await res.json()
}

const apiPATCH = async (api,body)=>{
    const res =  await fetch(`${BASE_URL}/${api}`,{ 
         method:"PATCH",
         headers:{
             'Accept': 'application/json',
             "Content-Type":"application/json",
             "Authorization":await AsyncStorage.getItem('token')
         },
         body:JSON.stringify(body)
     })     
     return await res.json()
}

const apiDELETE = async (api,body)=>{
    const res =  await fetch(`${BASE_URL}/${api}`,{ 
         method:"DELETE",
         headers:{
             'Accept': 'application/json',
             "Content-Type":"application/json",
             "Authorization":await AsyncStorage.getItem('token')
         },
         body:JSON.stringify(body)
     })
     
     return await res.json()
}

export {apiPOST, apiGET, apiPATCH, apiDELETE, apiPUT}