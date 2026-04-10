import { useNavigate, useParams } from "react-router-dom";
import { fetchCoinData } from "../api/coinGecko";
import { useEffect } from "react";
import { useState } from "react";

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
                <div className="flex flex-col items-center justify-center p-16 gap-4 text-[#e0e0e0]">
        
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
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-400 mt-2">ID: {id}</p>
        </div>
     )

}