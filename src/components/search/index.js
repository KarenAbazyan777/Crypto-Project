import React, { useCallback, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { API_URL } from '../../core/constants';
import Loading from '../loading';
import './search.css'


const Search = () =>{
    const [allCurrencies, setAllCurrencies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); 
  
    const navigate = useNavigate();

  
    useEffect(()=>{
        (async function(){
            const response = await fetch(API_URL)
            const data = await response.json();
            setAllCurrencies(data);
        })()
    },[])

    const handleSearchCurrency = useCallback((e)=>{
        const { target: { value } } = e;
        setSearchQuery(value);
        if(!value.length){
            setResults([]);
            return;
        }
        setLoading(true)
        const symbolsArr = value.split(''); 

       setTimeout(()=>{
        const resultsBySearch = allCurrencies.filter(el =>{
            return symbolsArr.every(item => el.id.includes(item))
        })
        setResults(resultsBySearch)
        setLoading(false)
       }, 500)
    }, [allCurrencies])

    const handleRedirect = (id) =>{
        navigate(`/currency/${id}`);
        setSearchQuery('');
    }

    const closeSearchBar = ()=>{
        setSearchQuery('');
    }

    const rednerSearchResults = useCallback(() =>{ 


       
        if(!searchQuery){
            return null
        }

      

        if(searchQuery && !results.length){
            return (
                <div className="Search-result-container">
                <div className="Search-no-result">
                  No results found.
                </div>
              </div>
            )
        }
       

        if(results.length){
           return <div className="Search-result-container">
                {results.map(el =>
                  <div
                    key={el.id}
                    className="Search-result"
                    onClick={() => handleRedirect(el.id)}
                  >
                    {el.name} ({el.symbol})
                  </div>
                )}
              </div>
        }
    }, [searchQuery, results])


    return (
        
        <div className='Search'>
        <div>
        <span className="Search-icon" />
        <input 
            type="text"
            onChange={handleSearchCurrency}
            value={searchQuery}
            className="Search-input"
            placeholder="Currency name"
        />
        {loading && <div className="Search-loading">
                <Loading
                    width="12px"
                    height="12px"
                />
        </div>}
        </div>
        {rednerSearchResults()}
    </div>
    )
};

export default Search