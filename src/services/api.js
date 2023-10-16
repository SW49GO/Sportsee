import {USER_MAIN_DATA} from '../dataMocked/datasMocked'
import {ChangeUserMainData} from './changeUserMainData'


// Bascule entre Environnement Dev (dataMocked) et Prod (Api)
const modeEnvDev = 'false'

export async function getAllUser(){
    return USER_MAIN_DATA
}

export async function fetchMainData(userId,setDatas) {
    if(process.env.REACT_APP_API_DEV === modeEnvDev){
        const userMainData = USER_MAIN_DATA.find((user)=>{
          if(user.id === parseInt(userId)){
            if(user!== null){
                // Replace todayScore and translate keyData
                ChangeUserMainData(user)
            }
              return user
          }
          return false
          })
        setDatas(userMainData)
    }else{
        try{
            const response = await fetch (`http://localhost:3000/user/${userId}`)
            const results = await response.json()
            if(results){
                ChangeUserMainData(results.data)
            }
            setDatas(results.data)
            console.log('resultsFetchUSER:', results)
        }catch(err){
            console.log(err)
            setDatas('')
          }
        }
    }