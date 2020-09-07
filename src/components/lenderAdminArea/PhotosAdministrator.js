import React from "react"
import {Carousel} from "react-bootstrap"

export default function PhotosAdministrator ({space, children}) {
    const spacePhotos = space.photos.map( link =>
        <Carousel.Item key={link}>
            <img
                className="d-block w-100"
                src={link}
                alt="photo"   
            >
            </img>   
        </Carousel.Item>
    ) 
    return(
        <React.Fragment>
            <Carousel className="position-relative">
                {spacePhotos}
                {children}
            </Carousel>
        </React.Fragment>
    )
}