export const CryptoCard = ({crypto}) => {
    return <div className="bg-gray-700 text-white p-4 rounded-xl flex items-center gap-4 hover:bg-gray transition">
        <img src={crypto.image} alt={crypto.name} 
        className="w-10 h-10"/>
    </div>
}