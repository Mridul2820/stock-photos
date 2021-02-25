import React from 'react'
import Photo from './Photo'

const PhotoGrid = ({ photos, loading }) => {
    return (
        <section className="photos">
            <div className="photos-center">
                {
                    photos.map(photo => {
                        console.log(photo)
                        return <Photo key={photo.id} {...photo} />
                    })
                }
            </div>
            {loading && <h2 className="loading">Loading...</h2> }
        </section>
    )
}

export default PhotoGrid
