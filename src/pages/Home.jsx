import {fetchCryptos} from '../api/coinGecko'
import { useEffect, useState } from 'react';
import { CryptoCard } from '../components/CryptoCard';
export const Home = () => {

    const [cryptoList, setCryptoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid")

    useEffect(()=>{
        fetchCryptoData();
    },[])
    const fetchCryptoData = async () => {
        try{
            const data = await fetchCryptos();
        setCryptoList(data);
        console.log(data);
        }catch (err) {
            console.error("Error fetching cryptos:",err);
        }finally {
            setIsLoading(false);
        }
    }
    return (
  <div className='min-h-screen bg-black'>

      <nav className='bg-gray-500 px-4 py-4 flex jusitfy-center items-center '>
      </nav>

     <div className='flex justify-between items-center px-4 mb-4'>
        <label className='text-white/50 sm:text-sm font-semibold md:ml-50'>Sort by :</label>
        <select className='text-white/50 sm:text-xs py-1
        font-semibold rounded-md border-3 border-gray-800 sm:mr-100 md:mr-185 outline-none'>
          <option value = "market_cap_rank">Rank</option>
          <option value = "name">Name</option>
          <option value = "price">Price (Low to High)</option>
          <option value = "price_desc">Price (High to Low)</option>
          <option value = "change">24h Change</option>
          <option value = "market_cap">Market Cap</option>
        </select>
       <div className='flex text-sm font-semibold text-white/70 mb-4 md:mr-50'>
            <button 
            onClick={()=>setViewMode("grid")}
             className={`px-5 py-1 rounded-md bg-gray-800 hover:bg-sky-600 hover:text-white mt-4  transition${viewMode === "grid" ? "active" : ""}`}>
              Grid</button>
            <button 
              onClick={()=>setViewMode("list")}
            className={`px-5 py-1 ml-2 mt-4 bg-gray-800 rounded-md hover:bg-sky-600 hover:text-white transition ${viewMode === "list" ? "active" : ""}`}>List</button>
      </div>
     </div>
     
    {isLoading ? (
      <div className="flex flex-col items-center justify-center p-16 gap-4 text-[#e0e0e0]">
        
        <div className="w-[50px] h-[50px] border-4 border-[rgba(173,216,230,0.2)] border-t-purple-500 rounded-full animate-spin"></div>
        
        <p>Loading...</p>

      </div>
    ) : (
      <div className={`text-white max-w-6xl mx-auto px-6 ${
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      : "flex flex-col gap-4"
        }`}>
        {cryptoList.map((crypto, key)=>(
            <CryptoCard crypto = {crypto} key = {crypto.id}/>
        ))}
      </div>
    )}
  </div>
);
};