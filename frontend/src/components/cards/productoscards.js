import "./productoscards.css"


const CardsProductos = ({imagen}) => {

    return (
        <div class="card mb-3" style={{maxWidth: "540px"}}>
            <div class="row g-0">
                <div class="col-md-4">
                    <img src={imagen} class="img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-12">
                    <div class="card-body">
                        <h5 class="card-title">Productos</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                        
                        <div>
                            <h1>$11.000</h1>
                        <button type="button" class="btncomprar">Comprar</button>
                        </div>

                        <div>
                        <button type="button" class="btnagregaralcarro">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CardsProductos;