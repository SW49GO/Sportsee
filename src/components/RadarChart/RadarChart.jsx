import { RadarChart,Radar, ResponsiveContainer,PolarAngleAxis,PolarGrid} from "recharts";
import { useState, useContext,useEffect } from "react";
import { Context } from '../Context';
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
     console.log('datasRADAR:', datas)
     // creation d'un objet pour reformater les données à partir de (kind et data)
    let newDatas={}
    if(datas!==null){
        console.log('RADARCHART:',datas)
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
console.log("newdata",newDatas)

     if(datas){
        return(
            <>
            <ResponsiveContainer className={Styles.container}>
                <RadarChart outerRadius={90} width={730} height={250} data={newDatas.data}>
                    {/* sans ligne vertical vers le centre */}
                    <PolarGrid radialLines={false}/>
                    {/*  tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} mettre la 1ere lettre en majuscule de value */}
                    <PolarAngleAxis dataKey="kind" axisLine={false} tickLine={false} dy={4} tick = {{fill:'#FFF', fontSize: 12, fontWeight: 500}} tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}/>
                    {/* <PolarRadiusAxis angle={30} domain={[0, 150]} /> */}
                    <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7}  domain={[0, 'dataMax']}/>
                    {/* <Legend /> */}
                </RadarChart>
            </ResponsiveContainer>
            </>
        )
    }else{
        return(
            <Error message="false"/>
        )
    }
}
export default RadarCharts