import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Stocks from './pages/Stocks.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className='page-container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/stocks' element={<Stocks/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
