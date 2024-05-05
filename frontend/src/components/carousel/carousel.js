import "./carousel.css";

const Carousel = ({ imagen1, imagen2 }) => {

    return (
        <div id="carouselExampleAutoplaying" class="carousel slide c1" data-bs-ride="carousel" style={{ marginTop: "30px", marginBottom: "50px" }}>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="container text-center">
                        <div class="row row-cols-4">
                            <div class="col">
                                <div class="card " style={{width: "17rem"}}>
                                    <img src={imagen1} class="card-img-top " alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Ver mas detalles</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card " style={{width: "17rem"}}>
                                    <img src={imagen1} class="card-img-top " alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" class="btn btn-primary">Ver mas detalles</a>
                                        </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card " style={{width: "17rem"}}>
                                    <img src={imagen1} class="card-img-top " alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" class="btn btn-primary">Ver mas detalles</a>
                                        </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card " style={{width: "17rem"}}>
                                    <img src={imagen1} class="card-img-top " alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" class="btn btn-primary">Ver mas detalles</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={imagen2} className="d-block w-100 carimg" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )

}

export default Carousel;