import NavBar from "../../components/navBar/navBar";

const Home = () => {
    return (
        <div>
            <header>
                <NavBar></NavBar> {/* Podemos importar componentes en otros componentes, este caso importamos el componente navbar en el componente de la propia pagina home */}
            </header>
        </div>
    )
}

export default Home;