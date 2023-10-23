import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../services/api';
import {Context} from '../context/Context'


/**
 * Function to Call datas from api.js->fetchData
 * Check if the mode is Prod or not
 * Check params userId
 * @param {object} userId ex:{'userId':18}
 * @param {boolean} modeProd 
 * @param {string} endpoint ex:'activity'
 * @returns 
 */
export function useFetchDatas(userId, modeProd, endpoint) {
  const url =useParams()
  const [datas, setDatas] = useState(null)
  const {handleUserSelect} = useContext(Context)

  useEffect(() => {
    if (modeProd) {
      // Managing the change of ID in the URL by a user to not view another user's page
      // And regenerate the context selectedUserId, l'id stored in the localStorage
      if(userId===null){
        const user = { 'userId': parseInt(localStorage.getItem('defaultUser')) }
        handleUserSelect(user)
      }else{
        fetchData(userId, setDatas, endpoint);
      }
    } else {
        fetchData(url.userId,setDatas, endpoint)
    }
  }, [userId, modeProd,url,endpoint, handleUserSelect]);
  return datas;
}