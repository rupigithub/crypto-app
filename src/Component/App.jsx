import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchData = async() =>{
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  //search function
  const filteredCoins = data.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting functionality
  const sortedCoins = filteredCoins.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.market_cap - b.market_cap;
    } else {
      return b.market_cap - a.market_cap;
    }
  });

  console.log(data);

  return (
    <>
      <div className="top">
        <div className="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search By name"
            onChange={(e)=> setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          </div>
          <button onClick={() => fetchData()}>fetchData(async/await)</button>
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort by Market Cap ({sortOrder})
      </button>
        </div>
        
      <table id="cryptoTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>Percentage Change (24h)</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {sortedCoins.map((coin) => (
            <tr key={coin.id}>
              <td>
              <img src={coin.image} alt={coin.name} style={{ width: '40px', height: '40px' }} />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{coin.current_price}</td>
              <td>{coin.total_volume}</td>
              <td>{coin.market_cap}</td>
              <td>{coin.market_cap_change_percentage_24h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App;
