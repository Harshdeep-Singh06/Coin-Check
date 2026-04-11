import {fetchCryptos} from '../api/coinGecko'
import { useEffect, useState } from 'react';
import { CryptoCard } from '../components/CryptoCard';
export const Home = () => {

    const [cryptoList, setCryptoList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid")
    const [sortBy, setSortBy] = useState("market_cap_rank");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        fetchCryptoData();
    },[])

    useEffect(()=>{
      filteredAndSort();
    },[sortBy, cryptoList,searchQuery])

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

    const filteredAndSort = () => {
      let filtered = cryptoList.filter((crypto)=>crypto.name.toLowerCase().includes(searchQuery.toLowerCase())||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()))


      filtered.sort((a, b)=>{
        switch(sortBy) {
          case "name":
           return a.name.localeCompare(b.name);
           case "price":
            return a.current_price - b.current_price;
           case "price_desc":
            return b.current_price - a.current_price;
           case "change":
            return a.price_change_percentage_24h - b.price_change_percentage_24h;
           case "market_cap":
            return a.market_cap - b.market_cap;
          default:
            return a.market_cap_rank - b.market_cap_rank;
        }
      })
      setFilteredList(filtered)
    }

    return (
     <div className='min-h-screen bg-black'>
        <nav className='px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-7 max-w-6xl mx-auto border-b-1 border-gray-900'>

         <div>
           <h1 className='text-gray-400 font-bold text-3xl'>
              🚀 Crypto Check
           </h1>
            <p className='text-gray-500 mt-2'>
               Real-time cryptocurrency prices and market data
           </p>
         </div>

        <div className='flex items-center mr-10 md:mr-50'>
        <input
    type="text"
    placeholder="Search crypto..."
    className="px-10 py-2 text-white 
    border-2 border-gray-900 border-r-0 rounded-l-full 
    outline-none transition
    placeholder-gray-500"
    onChange={(e)=>setSearchQuery(e.target.value)}
    value={searchQuery}
  />

  <button
    className="px-4 py-2
    border-2 border-gray-900 border-l-0
    rounded-r-full transition duration-300"
  >
    <p className='active:translate-y-1 duration-300'>🔍</p>
  </button>
        </div>

        </nav>

     <div className='flex justify-between items-center px-4 mb-6 mt-4'>
        <label className='text-white/50 text-sm font-semibold md:ml-50'>Sort by :</label>
        <select
        value = {sortBy} onChange={(e)=>setSortBy(e.target.value)}
        className='text-white/50 text-xs py-1
        font-semibold flex rounded-md border-3 border-gray-800 bg-black sm:mr-100 md:mr-185 outline-none'>
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
             className={`px-5 py-1 rounded-md bg-gray-800 hover:bg-sky-600 hover:text-white mt-4  transition ${viewMode === "grid" ? "active" : ""}`}>
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
      : "flex flex-col gap-4 mt-12"
        }`}>
        {filteredList.map((crypto)=>(
            <CryptoCard crypto = {crypto} key = {crypto.id}/>
        ))}
      </div>
    )}
  </div>
);
};