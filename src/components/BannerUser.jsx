import { useEffect, useState } from "react"
import { fetchMainData } from "../services/api"
import PropTypes from 'prop-types';
import Styles from '../styles/BannerUser.module.css'
import Error from "./Error";

function BannerUser(props){
    const users = props.user
    // console.log('users:', users)

    // State pour stocker les données
    const [datas, setDatas] = useState(null)
    // console.log('datasBANNER:', datas)

    // récupération des données selon l'id de l'utilisateur
    useEffect(()=>{
        fetchMainData(users.userId,setDatas)
    },[users.userId])


if(datas){
    return(
        <div className={Styles.banner}>
            <p>Bonjour <span>{datas.userInfos.firstName.charAt(0).toUpperCase() + datas.userInfos.firstName.slice(1)}</span></p>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    )
}else{
    return(
    <Error message="false"/>
    )
}
}

BannerUser.propTypes = {
    user: PropTypes.object.isRequired
}


export default BannerUser