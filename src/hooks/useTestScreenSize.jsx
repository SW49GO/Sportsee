import { useEffect, useState } from "react"

/**
 * Function to rezise some options for ReCharts
 * @param {string} theNameChart 
 * @returns {Number}
 */
export function useTestScreenSize(theNameChart){

    const [option, setOption]= useState(null)
    const [paddingBar, setPaddingBar] = useState(-30)
    const [outerRadius, setOuterRadius] = useState(75)
    const [circleR, setCircleR] = useState(42) 

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight
                if(theNameChart==='barChart'){
                    if (screenWidth <= 1024) {
                        setPaddingBar(-30)
                    }else{
                        setPaddingBar(-50)
                    }
                    setOption(paddingBar)
                }
                if(theNameChart==='radarChart'){
                    if (screenWidth <= 1024) {
                        setOuterRadius(46)
                    }else if(screenWidth === 1440 && screenHeight === 1024){
                        setOuterRadius(82)
                    }
                    setOption(outerRadius)
                }
                if(theNameChart==='radialBarChart'){
                    if(screenWidth > 1440){
                        setCircleR(39)
                    }
                    setOption(circleR)
                }
            }
        // Event to detect screen size change
        window.addEventListener('resize', handleResize)
            handleResize()
        // Removed events before React dismount the component 
        return () => {
        window.removeEventListener('resize', handleResize)
        }
    }, [theNameChart,paddingBar,outerRadius,circleR])
    return option
}