import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Stocks from './pages/Stocks.jsx';
import Stock from './pages/Stock.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className='page-container'>
        <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/stocks' element={<Stocks/>}/>
        <Route path='/stock' element={<Stock/>}/>
        <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
