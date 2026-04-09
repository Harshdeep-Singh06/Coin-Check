import { formatPrice } from "../utils/formatter"

export const CryptoCard = ({crypto}) => {
    return (
        <div className="bg-black border border-gray-800 text-white p-4 rounded-xl flex items-center justify-between hover:bg-gray-900 transition">

            <div className="flex items-center gap-4">
                <img src={crypto.image} alt={crypto.name}
                className="w-10 h-10"/>

                <div>
                    <h2 className="font-semibold">{crypto.name}</h2>
                    <p className="text-gray-400 text-sm uppercase">{crypto.symbol}</p>

                    <span className="rounded-xl bg-purple-500 px-2 text-black text-sm">#{crypto.market_cap_rank}</span>

                <p className="font-semibold">
                    {formatPrice(crypto.current_price)}
                </p>

                <p className={`text-sm ${
                    crypto.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    :"text-red-400"
                }`}>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
                </div>
            </div>


        </div>
    )


}