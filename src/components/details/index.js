import React, { useEffect, useState } from "react";
import { getCurrencyURL } from "../../core/helpers";
import { useParams } from "react-router-dom";
import Loading from "../loading";
import { renderChangePercent } from "../../core/helpers";
import Charter from "../charter";
import './Details.css'

const Details = () =>{
    const [currency, setCurrency] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isShowCharter, setIsShowCharter] = useState(false)

    const params = useParams(); 

    useEffect(()=>{
        const url = getCurrencyURL(params.id)
        setIsLoading(true)
        fetch(url).then((res)=>{
            if(!res.ok){
                throw new Error()
            }
            return res.json()
        }).then((result) =>{
            
            setIsLoading(false);
            setCurrency(result[0])
        }).catch((err)=>{
            setIsLoading(false);
            setError(err)
        })
    }, [params])

    if(isLoading){
        return <div className="loading-container">
            <Loading/>
            </div>
    }
    if(error){
        return <div>Erroor</div>
    }
    return (
       <>
       {isShowCharter && <Charter setIsShowCharter={setIsShowCharter}/>}
        <div className="Detail">
        <h1 className="Detail-heading">
            <img src={currency.image} alt="" onClick={(e)=>{
                e.stopPropagation();
                setIsShowCharter(!isShowCharter)
            }}/>
            {currency.name} ({currency.symbol})
        </h1>

        <div className="Detail-container">
            <div className="Detail-item">
                Price
                <span className="Detail-value">
                    $ {currency.current_price}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                Rank
                <span className="Detail-value">
                    {currency.market_cap_rank}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                Price Change Percentage 24h
                <span className="Detail-value">
                    {renderChangePercent(
                        currency.price_change_percentage_24h
                    )}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                24H Change
                <span className="Detail-value">
                    $ {currency.price_change_24h}
                </span>
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                <span className="Detail-title">Market cap</span>
                <span className="Detail-dollar">$</span>
                {currency.market_cap}
            </div>
        </div>
        <div className="Detail-container">
            <div className="Detail-item">
                <span className="Detail-title">Total supply</span>
                {currency.total_supply}
            </div>
        </div>
    </div>
       </>
    )
}
export default Details