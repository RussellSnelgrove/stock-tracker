import { useEffect, useState } from 'react'
import '../lib/css/App.css'
import Textbox from '../components/textbox.jsx'
import Picklist from '../components/Picklist.jsx'

function App() {
  const [inputValue, setInputValue] = useState('');
  // const [exchange, setExchange] = useState('');

  const getStock = () => {
    fetch('/api/xqq')
    // fetch('http://localhost:3000/api/xqq')
    .then(res => res.json())
    .then(json => console.log(json));
    // .then(result => console.log('result', result.json()));
  };

  useEffect(() => {
    getStock();
  }, [])

  return (
    <>
      <Textbox value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
      {/* <Picklist value={exchange} onChange={(event) => setExchange(event.target.value)}/> */}
    </>
  )
}

export default App
