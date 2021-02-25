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
    const [page, setPage] = useState(1)

    const fetchImages = async() => {
        setLoading(true)
        let url;
        const urlPage = `&page=${page}`
        url = `${mainUrl}${clientID}${urlPage}`

        try {
            const response = await fetch(url)
            const data = await response.json()
            setPhotos(oldPhotos => {
                return [...oldPhotos, ...data]
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [page])

    useEffect(() => {
        const event = window.addEventListener('scroll', () => {
            if(
                !loading && window.innerHeight + window.scrollY >= document.body.scrollHeight -2 ){
                setPage(oldPage => {
                    return oldPage + 1
                })
            }
        })
        return () => window.removeEventListener('scroll', event)
    }, [])

    return (
        <main>
            <Search />
            <PhotoGrid photos={photos} loading={loading} />
        </main>
    )
}

export default App

