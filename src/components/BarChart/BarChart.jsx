import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Legend,Bar} from 'recharts'
import { useTestScreenSize } from '../../hooks/useTestScreenSize'
import { useFetchDatas } from '../../hooks/useFetchDatas'
import Styles from '../../styles/barChart.module.css'
import { Context } from '../../context/Context'
import CustomToolTip from './CustomToolTip'
import { useContext } from 'react'
import Error from '../Error'


/**
 * Component function to build a component BarChart
 * @returns {JSX.Element}
 */
function BarCharts(){
    // Retrieving the context id user
    const {selectedUserId, modeProd } = useContext(Context)

    // Checking the modeProd for the call and retrieving data using a custom hook
    const datas = useFetchDatas(selectedUserId, modeProd,'activity')
    // Using custom hook to check screen size to adjust horizontal axis
    const paddingBar = useTestScreenSize('barChart')


    if(datas && datas!=="err"){
    return (
        <div className={Styles.barChart}>
        <h3 className={Styles.title}>Activité quotidienne</h3>
        <ResponsiveContainer  width="100%" height="100%" className={Styles.container}>
            <BarChart 
            data={datas}
            // taille largeur barres + écartement entre les barres
            barSize={7} barGap={8}
            margin={{top:20, bottom:40, right:0, left:30}}
            >
                {/* Ligne grise en fond pointillé -> 3:tiret suivi de 3 espaces*/}
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                {/* Fonction pour extraire le jour du mois : tickFormatter={(day) => new Date(day).getDate()*/}
                {/* tick ->tiret */}
                <XAxis dataKey="day" stroke="#9B9EAC" axisLine={true}  tick={{ fontSize: 14, fontWeight: 500}}  tickLine={false} tickFormatter={(day) => new Date(day).getDate()} tickMargin={10}  padding={{ right: paddingBar, left: paddingBar}}/>
                {/* domain={['auto', 'dataMax']} graduation des données */}
                <YAxis type="number" stroke="#9B9EAC" axisLine={false}  tick={{ fontSize: 14, fontWeight: 500}}  tickLine={false} tickCount='3' tickMargin={15} domain={['auto', 'dataMax']}  orientation="right"/>
                {/* Encars fond gris qui s'affiche au passage de la souris + sa légende */}
                <Tooltip cursor={{ fill: 'rgba(196, 196, 196, 0.5)'}}  content={<CustomToolTip/>}/>
                {/* Position légende rattaché au Bar + styles icons et name*/}
                <Legend verticalAlign="top" align="right" iconType="circle" iconSize="8" height={50} wrapperStyle={{ fontSize: '14px', fontWeight: 500}}/>
                {/* Barres du graph */}
                <Bar name="Poids (kg)" dataKey="kilogram" fill="#000000" radius={[5, 5, 0, 0]}/>
                <Bar name="Calories brûlées (kCal)" dataKey="calories" fill="#FF0000" radius={[5, 5, 0, 0]}/>
            </BarChart>
        </ResponsiveContainer>
        </div>
    )
    }else if(datas===''){
        return(
            <><Error message="404"/></>
        )
    }else {
        return (
            <><Error message="err"/></>
        )
    } 
}
export default BarCharts