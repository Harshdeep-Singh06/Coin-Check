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

      <nav className='bg-purple-500 px-4 py-4 flex jusitfy-center items-center '>
          <div className='gap-2 flex bg-purple-600 p-1 rounded-lg'>
            <button 
            onClick={()=>setViewMode("grid")}
             className={`px-4 py-1 rounded-md transition ${viewMode === "grid" ? "active" : ""}`}>
              Grid</button>
            <button 
              onClick={()=>setViewMode("list")}
            className={`px-4 py-1 rounded-md transition ${viewMode === "list" ? "active" : ""}`}>List</button>
          </div>

      </nav>
     
    {isLoading ? (
      <div className="flex flex-col items-center justify-center p-16 gap-4 text-[#e0e0e0]">
        
        <div className="w-[50px] h-[50px] border-4 border-[rgba(173,216,230,0.2)] border-t-purple-500 rounded-full animate-spin"></div>
        
        <p>Loading...</p>

      </div>
    ) : (
      <div className='text-white'>
        {cryptoList.map((crypto, key)=>(
            <CryptoCard crypto = {crypto} key = {crypto.id}/>
        ))}
      </div>
    )}
  </div>
);
};