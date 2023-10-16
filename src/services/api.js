import {USER_MAIN_DATA, USER_ACTIVITY} from '../dataMocked/datasMocked'
import {ChangeUserMainData} from './changeUserMainData'


// Bascule entre Environnement Dev (dataMocked) et Prod (Api)
const modeEnvDev = 'true'

export async function getAllUser(){
    return USER_MAIN_DATA
}

/**
 * Function to retrieve datas from USER_MAIN_DATA
 * @param {string} userId the id of user
 * @param {function} setDatas to initialize 'datas'
 */
export async function fetchMainData(userId, setDatas) {
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

    /**
     * Function to retrieve Datas
     * @param {object} userId ex:{'userId','12'}
     * @param {function} setDatas to initialize State "datas"
     * @param {string} endpoint the end of url
     */
    export async function fetchData(userId, setDatas, endpoint) {
    if(process.env.REACT_APP_API_DEV === modeEnvDev){
        if(endpoint === "activity" && userId){
            const userActivity = USER_ACTIVITY.filter((user)=>{
                    if(user.userId === parseInt(userId.userId)){
                      console.log(user)
                        return user
                    }
                    return false
                    })
                setDatas(userActivity[0].sessions)
        }
    }
}