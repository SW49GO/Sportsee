import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../services/api';

export function useFetchDatas(userId, modeProd, endpoint) {
const url =useParams()
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    if (modeProd && userId) {
      fetchData(userId, setDatas, endpoint);
    } else {
        fetchData(url.userId,setDatas, endpoint)
    }
  }, [userId, modeProd,url,endpoint]);

  return datas;
}