import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../core/constants";
import { parseQuery } from "../../core/helpers";
import Loading from "../loading";
import Pagination from "../pagination";
import Table from './Table'
import './Table.css';

const perPage = 20;
const totalPages = 5

const List = ()=>{
    const [ isLoading , setIsLoading] = useState(false)
    const [ currencies , setCurrencies] = useState([])
    const [ error , setError] = useState(null)
    const [ page , setPage] = useState(1)
    const { search, pathname } = useLocation();
    const { page: urlPage } = parseQuery(search)
    const navigate = useNavigate();
    // const searchParams = new URLSearchParams(search);

    const fetchCurencies =(page) =>{
        const url = `${API_URL}page=${page}&per_page=${perPage}`;
        setIsLoading(true)
        fetch(url, {
            method:'GET',
            cache: 'no-cache'
        })
        .then((resp)=>{
            if(!resp.ok){
                throw new Error('a')
            }
            return resp.json()
        }).then((data)=>{
            setCurrencies(data)
            setIsLoading(false)
        }).catch((err)=>{
          setIsLoading(false)
          setError(err.message)
        })
    }

    useEffect(()=>{
        if(!urlPage){
            navigate(`${pathname}?page=1`)
        }
        setPage(+urlPage || 1)
    }, [urlPage])

    useEffect(()=>{
        if(urlPage){
            fetchCurencies(urlPage)
        }
    }, [urlPage])


   const handleChangePagination = (direction) =>{
       const  newPage = direction === 'next' ? page + 1 : page - 1;
        navigate(`${pathname}?page=${newPage}`)
        setPage(newPage)
    }

        if(error){
            return <div>{error}</div>
        }
        if(isLoading){
            return <div className="loading-container"> <Loading/> </div>
        }
        return(
            <>
            <Table currencies={currencies}/>
            <Pagination 
            page = {page}
            totalPages = {totalPages}
            handleChangePagination={handleChangePagination}
            />            
            </>
        )
    }
export default List