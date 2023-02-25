import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loading from "../loading";


const Charter = ({setIsShowCharter}) =>{
    const [prices , setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const charterRef = useRef(null);

    const getCharterInfo = useCallback(()=>{
        setIsLoading(true)
        const url = `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=3`
        fetch(url).then((res)=>{
            return res.json()
        }).then((result)=>{
            setIsLoading(false)
            setPrices(result.prices)
        })
    },[params])

    const handleToggleCharter = useCallback((e)=>{
        if(!charterRef.current.contains(e.target)){
            setIsShowCharter(false)
        }
    }, [])

    useEffect(()=>{
        document.addEventListener('click', handleToggleCharter)
        getCharterInfo()
        return ()=>{
            document.removeEventListener('click' , handleToggleCharter)   
        }
    }, [])

    const options = useMemo(()=>{
        return  {
            title: {
              text: 'My chart'
            },
            series: [{
              data: prices.map(el => el?.[1])
            }]
          }          
    }, [prices])

    if(isLoading){
        return <div className="loading-container"><Loading/></div>
    }
    return (
        <div ref={charterRef}>
        <HighchartsReact highcharts={Highcharts} options={options}/>        
        {/* <Test charterRef={charterRef}/> */}
        </div>
    )
}
export default Charter;