import { useState } from 'react'
import '../../lib/css/NavbarSearchBox.css';

function SearchTextBox({ searchTerm }) {
    const [inputValue, setInputValue] = useState('');

    function searchInput() {
        searchTerm(inputValue);
    };

    return (
        <>
            <div className='search-box'>
                <input
                    type="text"
                    className="search-input"
                    placeholder='Search Stock Symbol...'
                    value={inputValue}
                    onKeyDown={(event) => { if (event.key === 'Enter') searchInput() }}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <div
                    className="search-icon"
                    onClick={searchInput}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default SearchTextBox