import { RadarChart,Radar, ResponsiveContainer,PolarAngleAxis,PolarGrid} from "recharts";
import { useState, useContext,useEffect } from "react";
import { Context } from '../../context/Context';
import { fetchData } from "../../services/api";
import Styles from '../../styles/RadarChart.module.css'
import Error from "../Error";

function RadarCharts(){
     // récupération de l'id du context
     const {selectedUserId } = useContext(Context);
     const [datas, setDatas] = useState(null)
   

   
     // récupération des données de l'utilisteur
     useEffect(()=>{
       fetchData(selectedUserId, setDatas, "performance")
     },[selectedUserId])
     // creation d'un objet pour reformater les données à partir de (kind et data)
    let newDatas={}
    
    if(datas!==null){
        console.log('datasRADAR:', datas)
        const kindDatas = datas.kind

        newDatas = {
            data: datas.data.map((dataItem) => {
                return {
                    kind: kindDatas[dataItem.kind],
                    value: dataItem.value
                };
            })
        };
        //inverse l'ordre des objets de kind dans data
        newDatas.data.reverse();
    }

     if(datas){
        return(
            <div className={Styles.radarChart}>
                <ResponsiveContainer  width="100%" height="100%" className={Styles.container}>
                    <RadarChart data={newDatas.data} outerRadius={80}>
                        {/* sans ligne vertical vers le centre */}
                        <PolarGrid radialLines={false}/>
                        {/*  tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} mettre la 1ere lettre en majuscule de value // dy-> recentrage des datas*/}
                        <PolarAngleAxis dataKey="kind" axisLine={false} tickLine={false} dy={2} tick = {{fill:'#FFF', fontSize: 12, fontWeight: 500}} tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}/>
                        {/* Affichage des graduations -><PolarRadiusAxis angle={30} domain={[0, 150]} /> */}
                        <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7}d/>
                        {/* <Legend /> */}
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        )
    }else{
        return(
            <Error message="404"/>
        )
    }
}
export default RadarCharts