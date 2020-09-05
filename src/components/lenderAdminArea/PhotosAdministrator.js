import React from "react"
import {Carousel} from "react-bootstrap"
const images= ["https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80","https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80","https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"];

export default function PhotosAdministrator ({space, children}) {
    const spacePhotos = images.map( link =>
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