import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMainData } from '../services/api';

export function useFetchMainData(userId, modeProd) {
const url =useParams()
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    if (modeProd && userId) {
      fetchMainData(userId, setDatas);
    } else {
        fetchMainData(url.userId,setDatas)
    }
  }, [userId, modeProd,url]);

  return datas;
}