import { formatPrice,formatMarketCap } from "../utils/formatter"
import { Link } from "react-router"


export const CryptoCard = ({crypto}) => {
    return (
        <Link to = {`/coin/${crypto.id}`}>
        <div className="bg-black border border-gray-800 text-white p-4 rounded-xl flex flex-col hover:translate-y-1 hover:shadow-2xl hover:shadow-gray-800 duration-200">

            <div className="flex items-center gap-4">
               <div>
                 <img src={crypto.image} alt={crypto.name}
                className="w-10 h-10"/>
               </div>

                <div>
                    <h2 className="font-semibold">{crypto.name}</h2>
                    <p className="text-gray-400 text-sm uppercase">{crypto.symbol}</p>

                    <span className="rounded-xl bg-purple-500 px-2 text-black text-sm">#{crypto.market_cap_rank}</span>
                </div>
            </div>

              <div className="mt-3 ml-2">
                 <p className="font-semibold text-xl">
                    {formatPrice(crypto.current_price)}
                </p>
                  <div className="flex items-center justify-between mt-3"> 
                    <p className={` text-sm rounded-md font-medium p-2 px-2 py-1 ${
                    crypto.price_change_percentage_24h >= 0
                    ? " bg-green-400/20 text-green-400"
                    : " bg-red-400/20 text-red-400"
                }`}>
                    {crypto.price_change_percentage_24h >= 0
                    ? "↑ "
                    :"↓ "}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>  
                  </div>
                    <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
                    <div >
                        <span className="text-gray-500 text-xs font-semibold">
                       MARKET CAP 
                    </span>
                       <div> <span className="text-sm">${formatMarketCap(crypto.market_cap)} </span></div>
                    </div>
                         <div>
                    <span className="text-gray-500 text-xs font-semibold">
                        VOLUME
                    </span>
                    <div>
                        <span className="text-sm">${formatMarketCap(crypto.total_volume)} </span>
                    </div>
                 </div>
                 </div>
                    
              </div>
              
        </div>
        </Link>
    )


}