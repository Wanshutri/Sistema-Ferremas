import { Link } from 'react-router-dom';
import './error404.css'

const Error404 = () => {
    return <>
    <div id="error404div">
        <div>
        <h1>La pagina que estas buscando no existe</h1>
        <img src='https://i.pinimg.com/236x/9f/8f/4c/9f8f4c2165f1df967864ee3de4d3b6ea.jpg'></img><br></br>
        <Link to="/"><button >Volver al inicio</button></Link>
        </div>
    </div>
    </>
}

export default Error404;