import React from "react";
import Slider from "react-slick";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import hammer from '../../assets/img/martillo.jpg'
import './productoscarrusel.css'

function Responsiveproduct() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 8000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hammer} />
                        <Card.Body className="cardbody">
                            <Card.Title className="cardtitle">Card Title</Card.Title>
                            <Card.Text className="cardtext">
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary" className="cardbutton">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Slider>
        </div>
    );
}

export default Responsiveproduct;