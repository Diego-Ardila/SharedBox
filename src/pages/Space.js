import React, {useState} from 'react';
import { Card, Col, Row, Badge, Carousel, Button } from 'react-bootstrap';

const Space = ({ space }) => {
  let [ index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
      setIndex(index = selectedIndex)
  }
  const carouselImages = space.images.map( element => 
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={element} width={300} height={300}
        alt={space.key+" slide"}
      />
    </Carousel.Item>
  );
  const carouselBadges = space.spaceTags.map(element => 
    <Badge variant="info">{element}</Badge>
  );
  return (
    <Card className="mt-4">
      <Row>
        <Col lg={4} md={4}>
        <Carousel 
        activeIndex={index}
				onSelect={handleSelect} >
          {carouselImages}
        </Carousel>
        </Col>
        <Col lg={8} md={8}>
          <Card.Body>
            <Card.Title>{space.name.toUpperCase()}</Card.Title>
            <Card.Text>
              <Card.Subtitle>Dimensions</Card.Subtitle>
                Width: {space.width} Length:{space.length} Height:{space.height}
              <Card.Subtitle>Location</Card.Subtitle>
                {space.city}{"  "}{space.address}
            </Card.Text>
            <Card.Footer>
              {carouselBadges}
            </Card.Footer>
            <Button variant="secondary">Info</Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Space;