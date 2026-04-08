export const CryptoCard = ({crypto}) => {
    return <div className="bg-black border border-gray-800 text-white p-4 rounded-xl flex items-center gap-4 hover:bg-gray-400 transition">
        <img src={crypto.image} alt={crypto.name} 
        className="w-10 h-10"/>

        <div>
            <h2 className="font-semibold">{crypto.name}</h2>
            <p className="text-gray-400 text-sm uppercase">{crypto.symbol}</p>
        </div>

        <div classname="ml-auto text-right">
            <p className = "font-semibold">${crypto.current_price}</p>
        </div>
    </div>

}