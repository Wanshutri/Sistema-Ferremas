import NavBar from "../../components/navBar/navBar";

const Home = () => {
    return (
        
        <div>
            <header>
                <NavBar></NavBar> {/* Podemos importar componentes en otros componentes, este caso importamos el componente navbar en el componente de la propia pagina home */}
                <div>
                    <img src="https://6.soompi.io/wp-content/uploads/image/9f3cf588eb694f87a06660b9a72d5d26/dummy.jpeg?s=900x600&e=t" alt="" />
                </div>
            </header> 
            <body> 
                <div>
                    <p>Foto</p>
                    <p>Barra de navegacion</p>
                </div>
                <div>
                    <p>Slider</p>
                </div>
                <div>
                    <p>Categorias</p>
                </div>
            </body>
        </div>
    )
}

export default Home;