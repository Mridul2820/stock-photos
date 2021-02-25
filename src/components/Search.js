import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => {

    const handleSubmit = e => {
        e.preventDefault()
        console.log('hey')
    }

    return (
        <section className="search">
            <form className="search-form">
                <input 
                    type="text" 
                    placeholder="Search Photos" 
                    className="form-input" 
                />
                <button 
                    type="submit" 
                    className="submit-btn" 
                    onClick={handleSubmit}
                >
                    <FaSearch />
                </button>
            </form>
        </section>
    )
}

export default Search
