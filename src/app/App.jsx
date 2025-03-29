import Navbar from './components/Navbar.jsx';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Stocks from './pages/Stocks.jsx';

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/stocks":
      component = <Stocks />;
      break;
    case "/about":
      component = <About />;
      break;
  }
  return (
    <>
      <Navbar />
      <div className='page-container'>
        {component}
      </div>
    </>
  )
}

export default App
