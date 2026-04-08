import {fetchCryptos} from '../api/coinGecko'
import { useEffect, useState } from 'react';
export const Home = () => {

    const [cryptoList, setCryptoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        <div className=''>
           {isLoading ? <div></div> : <div></div>}
        </div>
    );
};