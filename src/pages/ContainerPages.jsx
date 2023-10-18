import { useParams } from 'react-router-dom'
import { useContext, useEffect} from 'react'
import {Context} from '../components/Context'
import Styles from '../styles/Profil.module.css'
import Error from '../components/Error'
import Profil from './Profil'

function ContainerPages(props){
    const user = props.page
    const url = useParams()
    console.log('urlPROFIL:', url)
    const { handleUserSelect} = useContext(Context);
    // console.log('userProfil:', url.userId)

    // Send url to Context one time
    useEffect(()=>{
        handleUserSelect(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   


    if(user==="user"){
        return (
            <div className={Styles.profil}>
                <Profil url={url}/>
            </div>
        )
    }else{
        return (
            <><Error message="true"/></>
        )
    }

}
export default ContainerPages