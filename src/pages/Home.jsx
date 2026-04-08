import {fetchCryptos} from '../api/coinGecko'
import { useEffect } from 'react';
export const Home = () => {


    useEffect(()=>{
        fetchCryptoData();
    },[])
    const fetchCryptoData = async () => {
        const data = await fetchCryptos()
        console.log(data);
    }
    return (
        <div>
            Home Page
        </div>
    );
};