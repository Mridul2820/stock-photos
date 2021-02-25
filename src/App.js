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
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState('')

    const fetchImages = async() => {
        setLoading(true)
        let url;
        const urlPage = `&page=${page}`
        const urlQuery = `&query=${query}`

        if(query) {
            url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
        }
        else {
            url = `${mainUrl}${clientID}${urlPage}`
        }

        try {
            const response = await fetch(url)
            const data = await response.json()
            setPhotos(oldPhotos => {
                if (query && page === 1) {
                    return data.results
                } else if (query) {
                    return [...oldPhotos, ...data.results]
                } else {
                    return [...oldPhotos, ...data]
                }
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchImages()
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, [])

    return (
        <main>
            <Search 
                getQuery={(q) => setQuery(q)} 
                getPage={(p) => setPage(p)} 
            />
            <PhotoGrid photos={photos} loading={loading} />
        </main>
    )
}

export default App

