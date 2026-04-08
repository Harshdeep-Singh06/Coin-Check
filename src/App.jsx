import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router';
import './App.css'
import { Home } from './pages/Home';
import { CoinDetail } from './pages/CoinDetail';

function App() {
  
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
