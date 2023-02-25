export const getCurrencyURL = (id) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&sparkline=false`

export function renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}</span>
    }
  }
  export const parseQuery = (queryString) => {
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  
    return pairs.reduce((query, item) => {
      const [key, value] = item.split('=');
      query[decodeURIComponent(key).toLowerCase()] = decodeURIComponent(value || '');
      return query;
    }, {});
  };
  
