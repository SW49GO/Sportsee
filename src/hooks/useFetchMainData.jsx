import { useEffect, useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import { fetchMainData } from '../services/api'
import {Context} from '../context/Context'


export function useFetchMainData(userId, modeProd) {
  const url =useParams()
  const [datas, setDatas] = useState(null)
  const {handleUserSelect} = useContext(Context)

  useEffect(() => {
    if (modeProd) {
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