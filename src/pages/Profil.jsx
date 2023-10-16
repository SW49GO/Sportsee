import { useParams } from 'react-router-dom'
import { useContext, useEffect} from 'react'
import {Context} from '../components/Context'
import BannerUser from '../components/BannerUser'

function Profil(){
    const url = useParams()
    const { handleUserSelect} = useContext(Context);
    console.log('userProfil:', url.userId)

    useEffect(()=>{
        handleUserSelect(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <BannerUser user={url}/>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta!{url.UserId}</div>
        </>
    )
}
export default Profil