import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Legend,Bar} from 'recharts'
import Styles from '../../styles/BarChart.module.css'
import { useContext } from "react";
import { Context } from '../../context/Context';
import CustomToolTip from './CustomToolTip';
import Error from '../Error';
import { useFetchDatas } from '../../hooks/useFetchDatas';


function BarCharts(){

    const {selectedUserId, modeProd } = useContext(Context);

    // Vérification du modeProd pour l'appel et récupération des données par un hook personnalisé
    const datas = useFetchDatas(selectedUserId, modeProd,'activity')

    if(datas){
    return (
        <div className={Styles.barChart}>
        <h3 className={Styles.title}>Activité quotidienne</h3>
        <ResponsiveContainer  width="100%" height="100%" className={Styles.container}>
            <BarChart 
            data={datas}
            // taille largeur barres + écartement entre les barres
            barSize={7} barGap={8}
            margin={{top:20, bottom:30}}
            >
                {/* Ligne grise en fond pointillé -> 3:tiret suivi de 3 espaces*/}
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                {/* Fonction pour extraire le jour du mois : tickFormatter={(day) => new Date(day).getDate()*/}
                {/* tick ->tiret */}
                <XAxis dataKey="day" stroke="#9B9EAC" axisLine={true}  tick={{ fontSize: 14, fontWeight: 500}}  tickLine={false} tickFormatter={(day) => new Date(day).getDate()} tickMargin={10}  padding={{ right: -30, left: -30}} />
                {/* domain={['auto', 'dataMax']} graduation des données */}
                <YAxis type="number" stroke="#9B9EAC" axisLine={false}  tick={{ fontSize: 14, fontWeight: 500}}  tickLine={false} tickCount='3' tickMargin={20} domain={['auto', 'dataMax']}  orientation="right"/>
                {/* Encars fond gris qui s'affiche au passage de la souris + sa légende */}
                <Tooltip cursor={{ fill: 'rgba(196, 196, 196, 0.5)'}}  content={<CustomToolTip/>}/>
                {/* Position légende rattaché au Bar + styles icons et name*/}
                <Legend verticalAlign="top" align="right" iconType="circle" iconSize="8" height={50} wrapperStyle={{ fontSize: '14px', fontWeight: 500 }}/>
                {/* Barres du graph */}
                <Bar name="Poids (kg)" dataKey="kilogram" fill="#000000" radius={[5, 5, 0, 0]}/>
                <Bar name="Calories brûlées (kCal)" dataKey="calories" fill="#FF0000" radius={[5, 5, 0, 0]}/>
            </BarChart>
        </ResponsiveContainer>
        </div>
    )
}else{
    return(
        <><Error message="404"/></>
    )
}
}
export default BarCharts