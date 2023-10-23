import { useEffect, useState, useContext } from 'react'
import { fetchMainData } from '../services/api'
import { useParams} from 'react-router-dom'
import {Context} from '../context/Context'

/**
 * Function to Call datas from api.js->fetchMainData
 * Check if the mode is Prod or not
 * Check params userId
 * @param {object} userId ex: {'userId':12}
 * @param {boolean} modeProd 
 * @returns datas
 */
export function useFetchMainData(userId, modeProd) {
  const url =useParams()
  const [datas, setDatas] = useState(null)
  const {handleUserSelect} = useContext(Context)

  useEffect(() => {
    if (modeProd) {
      // Managing the change of ID in the URL by a user to not view another user's page
      // And regenerate the Context selectedUserId, l'id stored in the localStorage
      if(userId===null){
        const user = { 'userId': parseInt(localStorage.getItem('defaultUser')) }
        handleUserSelect(user)
      }else{
        fetchMainData(userId, setDatas)
      }
    } else {
        fetchMainData(url.userId,setDatas)
    }
  }, [userId, modeProd,url, handleUserSelect]);
  return datas;
}