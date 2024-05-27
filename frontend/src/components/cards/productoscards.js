import "./productoscards.css"


const CardsProductos = ({imagen}) => {

    return (
        <div className="card mb-3" style={{maxWidth: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={imagen} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-12">
                    <div className="card-body">
                        <h5 className="card-title">Productos</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        
                        <div>
                            <h1>$11.000</h1>
                        <button type="button" className="btncomprar">Comprar</button>
                        </div>

                        <div>
                        <button type="button" className="btnagregaralcarro">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CardsProductos;