import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
function App() {
  const [coindata, setcoindata] = useState([])
  const [search, setsearch] = useState('')

  useEffect(() => {
    axios
      .get('https://api.coinstats.app/public/v1/coins?skip=0')
      .then((response) => {
        console.log(response.data.coins)
        setcoindata(response.data.coins)
      })
  }, [search])

  const fileteredData = coindata.filter((x) => {
    return x.id.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="App">
      <div className="navbar">
        <h1>Cryptocurrency details viewer</h1>
        <input
          type="text"
          placeholder="Search your crypto here..."
          onChange={(e) => {
            setsearch(e.target.value)
          }}
        />
      </div>
      {fileteredData.map((x, key) => {
        return (
          <div key={key} className="maindiv">
            <div className="coinid coinimg">
              <img src={x.icon} alt="crypto pic" />
            </div>
            <div className="coinid">Coin name: {x.name}</div>
            <div className="coinid">Coin Symbol: {x.symbol}</div>
            <div className="coinid">Coin Price: {x.price}</div>
            <div className="coinid">Coin Volume: {x.volume}</div>
            <div className="coinid">Coin Market Cap: {x.marketCap}</div>
            <div className="coinid">Coin Total Supply: {x.totalSupply}</div>
          </div>
        )
      })}
    </div>
  )
}

export default App
