import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
    const [SearchBarInput, setSearchBarInput] = useState('Seattle, WA')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (SearchBarInput) {
            onSearch(SearchBarInput);
            setSearchBarInput('')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <span className="search-icon">🔎</span>
            <input
                className="search-input"
                type="text"
                value={SearchBarInput}
                onChange={(e) => setSearchBarInput(e.target.value)}
                placeholder={SearchBarInput}
                required

            />
        </form>
    )
}

export default SearchBar;