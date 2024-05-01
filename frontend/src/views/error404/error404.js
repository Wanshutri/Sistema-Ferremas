import './error404.css';
import brokenHammer from './../../assets/img/error404.png';

const Error404 = () => {

    return (
        <div id="error404">
            <div className='d-flex'>
                <div className='div404'>
                    <h1>Pagina no encontrada</h1>
                    <img src={brokenHammer} alt="Hammer"></img>
                </div>
            </div>

        </div>
    );

}

export default Error404;


//SNIPPET SECRETO PARA API
/*

import { useEffect, useState } from 'react';
import axios from 'axios';

const [data, setData] = useState({}); // Cambiado para inicializar como un objeto en lugar de un array
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        console.log(data)
        fetchData();
    }, []);

<h1>{data[0].pNombre}</h1>*/