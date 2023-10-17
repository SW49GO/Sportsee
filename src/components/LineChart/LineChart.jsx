import { LineChart, ResponsiveContainer,XAxis,YAxis,Tooltip,Line} from "recharts";
import { fetchData } from '../../services/api'
import { useContext, useState,useEffect} from 'react'
import { Context } from '../Context'
import Styles from '../../styles/LineChart.module.css'
import CustomToolTip from './CustomToolTip'
import Error from '../Error'


function LineCharts(){
     // récupération de l'id du context
     const {selectedUserId } = useContext(Context);
     const [datas, setDatas] = useState(null)

     // récupération des données de l'utilisteur
     useEffect(()=>{
       fetchData(selectedUserId, setDatas, 'average-sessions')
     },[selectedUserId])
    
     const formatDay = (item) => {
        const data = {1: 'L',2: 'M',3: 'M',4: 'J',5: 'V',6: 'S',7: 'D'};
        return data[item]
      };
      console.log('les datasLINECHART',datas)
    if(datas){
     return(
        <>
        <h3 className={Styles.title}>Durée moyenne des sessions</h3>
        <ResponsiveContainer width="100%" height="100%" className={Styles.container}>
        <LineChart 
        // width={500} 
        // height={250} 
        data={datas}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
        <XAxis dataKey="day" axisLine={false} tickLine={false} tickFormatter={formatDay} padding={{ right: -20, left: -10 }}/>
        <YAxis hide domain={['dataMin-10', 'dataMax+10']}  />
        {/* cursor={{ stroke : "rgba(0, 0, 0, 0.1)", strokeWidth : 100}}  */}
        <Tooltip content={<CustomToolTip />} cursor={false}/>
        {/* Le point(billes) actif s'affiche lorsqu'un utilisateur entre dans un graphique linéaire et ce graphique comporte une info-bulle */}
        <Line type="natural" dataKey="sessionLength" strokeWidth={2} stroke="#FFF" activeDot={{ stroke: '#FFF', strokeWidth: 4, r: 2}} dot={false} />
        </LineChart>
        </ResponsiveContainer>
        </>
     )
    }else{
        return(
            <Error message="false"/>
        )
    }
}
export default LineCharts

