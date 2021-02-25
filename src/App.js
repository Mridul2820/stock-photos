import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import PhotoGrid from './components/PhotoGrid'
import './App.scss';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

const App = () => {
    const [loading, setLoading] = useState(false)
    const [photos, setPhotos] = useState([])

    const fetchImages = async() => {
        setLoading(true)
        let url;
        url = `${mainUrl}${clientID}`

        try {
            const response = await fetch(url)
            const data = await response.json()
            setPhotos(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    return (
        <main>
            <Search />
            <PhotoGrid photos={photos} loading={loading} />
        </main>
    )
}

export default App

