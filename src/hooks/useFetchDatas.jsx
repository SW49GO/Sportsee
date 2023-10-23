import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../services/api';
import {Context} from '../context/Context'

export function useFetchDatas(userId, modeProd, endpoint) {
  const url =useParams()
  const [datas, setDatas] = useState(null)
  const {handleUserSelect} = useContext(Context)

  useEffect(() => {
    if (modeProd) {
      // Gestion du changement d'ID dans l'url par un utilisateur pour ne pas visualiser la page d'un autre utilisateur
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