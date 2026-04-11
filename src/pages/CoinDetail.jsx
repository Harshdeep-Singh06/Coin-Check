import { useNavigate, useParams } from "react-router-dom";
import { fetchCoinData } from "../api/coinGecko";
import { useEffect } from "react";
import { useState } from "react";
import { formatPrice } from "../utils/formatter";

export const CoinDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        loadCoinData();
    }, [id])

    const loadCoinData = async () => {
          try{
                    const data = await fetchCoinData(id);
                setCoin(data);
                console.log(data);
                }catch (err) {
                    console.error("Error fetching cryptos:",err);
                }finally {
                    setIsLoading(false);
                }
    };

       if (isLoading){
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-16 gap-4 text-[#e0e0e0]">
            
            <div className="w-[50px] h-[50px] border-4 border-[rgba(173,216,230,0.2)] border-t-purple-500 rounded-full animate-spin"></div>
            
            <p>Loading coin data...</p>

        </div>
    )
}


         if (!coin){
            return(
            <div className="min-h-screen bg-black justify-center items-center flex ">
                <div className="justify-items-center flex-col flex border-2 border-red-900 px-30 py-20 rounded-2xl shadow-2xl shadow-red-900">
                 <p className="text-3xl text-red-800 font-bold mb-5">COIN NOT FOUND</p>
                <button onClick={()=>navigate("/")}
                className="border-2 border-red-900 py-2 rounded-md  text-red-800 mt-5 font-semibold">Go Back</button>
                </div>
            </div>
        )
     }
     return(
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
         <div className="flex items-center">
            <button onClick={()=>navigate("/")}
            className="border-gray-900 border-4 rounded-md px-2 py-1 text-gray-500 hover:border-gray-800 font-semibold active:translate-y-1 transition">
                ← Back to List
            </button>
         </div>
      </nav>
      <div className="mx-auto md:max-w-6xl flex mt-6  ">
        <img src={coin.image.small} alt={coin.name}
        className="w-16 h-16 p-2"/>
        <div className="">
            <h1 className="ml-1 mt-1 font-semibold text-gray-400">{coin.name}</h1>
            <p className="text-gray-600 text-xs ml-2 mt-1">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
       <span className="mt-4 px-3 py-1 rounded-full bg-purple-500 text-black text-xs font-semibold mx-auto sm:ml-3 md:ml-51">
        #{coin.market_cap_rank}
        </span>
       <div className="border-2 border-gray-900 max-w-xs md:max-w-6xl mx-auto rounded-2xl px-4 py-5 ml-4 md:ml-50 md:mt-10 mt-4">
        <div className="flex mt-2">
         <p className="font-semibold text-2xl ml-1 text-white">
             {formatPrice(coin.market_data.current_price.usd)}
         </p>
         </div>
        <div className="flex mt-4 mb-5 ml-1">
             <p className={` text-sm text-white rounded-md font-medium p-2 px-2 py-1 ${
            coin.market_data.price_change_percentage_24h >= 0
            ? " bg-green-400/20 text-green-400"
              : " bg-red-400/20 text-red-400"
                }`}>
                   {coin.market_data.price_change_percentage_24h >= 0
                  ? "↑ "
                  :"↓ "}
                 {coin.market_data.price_change_percentage_24h.toFixed(2)}%
         </p> 
        </div>
        <div className="justify-between flex">
            <span className="text-gray-500 text-xs ">24h High</span>
            <span className="text-gray-500 text-xs md:mr-200">24h low</span>
        </div>
        <div className="justify-between flex mt-2">
            <span className="text-gray-200">{formatPrice(coin.market_data.high_24h.usd)}</span>
            <span className="text-gray-200 md:mr-200">{formatPrice(coin.market_data.low_24h.usd)}</span>
        </div>
       </div>
      </div>  
)   

}