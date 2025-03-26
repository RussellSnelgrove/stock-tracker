import { useState } from 'react'

function SearchTextBox({ searchTerm }) {
    const [inputValue, setInputValue] = useState('');

    function handleKeyDown() {
        searchTerm(inputValue);
    };

    return (
        <>
            <input type="text" className="textbox" value={inputValue} onKeyDown={(event) => { if (event.key === 'Enter') handleKeyDown() }} onChange={(event) => setInputValue(event.target.value)} />
        </>
    );
}

export default SearchTextBox