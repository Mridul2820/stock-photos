import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = ({ getQuery, getPage }) => {
    const [search, setSearch] = useState('')

    const getSearch = e => {
        e.preventDefault()
        getQuery(search)
        getPage(1)
    }

    return (
        <section className="search">
            <form className="search-form" onSubmit={getSearch} >
                <input 
                    type="text" 
                    placeholder="Search Photos" 
                    className="form-input" 
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                    }}
                />
                <button 
                    type="submit" 
                    className="submit-btn" 
                >
                    <FaSearch />
                </button>
            </form>
        </section>
    )
}

export default Search
