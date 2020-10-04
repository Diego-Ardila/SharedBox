import React from "react"
import {Carousel} from "react-bootstrap"
import { useSelector } from "react-redux"

export default function PhotosAdministrator ({ children }) {
    const photos = useSelector(state => state.publishAreaReducer.photos)

    const spacePhotos = photos.map( link =>{
        let img = link || 'https://www.freeiconspng.com/uploads/no-image-icon-15.png';
        return (<Carousel.Item key={link}>
            <img 
                className="d-block w-100"
                src={img} width={300} height={300}
                alt="spacePhoto"   
            >
            </img>   
        </Carousel.Item>
        )
        }
    ) 
    return(
        <div className="position-relative">
            <Carousel >
                {spacePhotos}
            </Carousel>
            {children}
        </div>
    )
}