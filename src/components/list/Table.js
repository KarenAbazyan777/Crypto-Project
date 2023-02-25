import React from 'react'
// import { withRouter } from 'react-router-dom'
import { renderChangePercent } from '../../core/helpers'
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const Table = ({currencies, history}) =>{
  const navigate = useNavigate(); 
  const {search} = useLocation()

  return ( 
    <div className="Table-container"> 
            <table className="Table">
              <thead className="Table-head">
                <tr>
                  <th>Cryptocurrency</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>24H Change</th>  
                </tr>    
              </thead> 
              <tbody className="Table-body">
              {currencies.map((currency) => (
                <tr 
                key={currency.id}
                onClick={()=> {
                  
                  // window.location.pathname = `/currency/${currency.id}`
                  // window.location.replace(`/currency/${currency.id}`)
                  // window.history.pushState(`/currency/${currency.id}`)
                  navigate(`/currency/${currency.id}${search}`)
                }}
                >
                  <td>
                    <span className="Table-rank">
                      <img 
                      style={{width:'50px',height:'50px'}} 
                      src={currency.image} 
                      alt=""
                      />
                      </span>
                    {currency.name}
                  </td>
                  <td>
                    <span className="Table-dollar">$ {currency.current_price}</span>
                  </td>
                  <td>
                    <span className="Table-dollar">$ {currency.market_cap}</span>
                  </td>
                  <td>
                    {renderChangePercent(currency.market_cap_change_percentage_24h)}
                  </td>
                </tr> 
              ))}
              </tbody>
            </table>
          </div>
    )
}

Table.propTypes = {
  currencies : PropTypes.array.isRequired,
  // history: PropTypes.object.isRequired
}

// export default withRouter(Table);
export default Table;