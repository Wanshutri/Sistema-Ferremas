import React from 'react';
import './carro.css';
import sana from './../../img/sana.jpg';

function Carro() {
  return (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>producto</th>
          <th>Nombre</th>
          <th>Modelo</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <img
                src={sana}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">Minatozaki Sana</p>
                <p className="text-muted mb-0"></p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Cuerpo inflable de idol</p>
            <p className="text-muted mb-0">Corea del Sur</p>
          </td>
          <td>
            <span className="badge badge-success rounded-pill d-inline">Active</span>
            <p>Quiero saber!</p>
            <p>Pulsaciones de vagina con ritmo nivel cardio</p>
          </td>
          <td>
            <div className='counter'>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              <p>$900.000</p>
            </button>
          </td>
        </tr>
        {/* Manejar con JavaScript para que se repita todo el rato (No se javaScript xd)*/}
      </tbody>
      <thead className="bg-light">
        <tr>
          <th>producto</th>
          <th>Nombre</th>
          <th>Modelo</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <img
                src={sana}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">Minatozaki Sana</p>
                <p className="text-muted mb-0"></p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Cuerpo inflable de idol</p>
            <p className="text-muted mb-0">Corea del Sur</p>
          </td>
          <td>
            <span className="badge badge-success rounded-pill d-inline">Active</span>
            <p>Quiero saber!</p>
            <p>Pulsaciones de vagina con ritmo nivel cardio</p>
          </td>
          <td>
          <div className='counter'>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
        </td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              <p>$900.000</p>
            </button>
          </td>
        </tr>
        {/* Repite esta estructura para cada producto en el carrito */}
      </tbody>
      <thead className="bg-light">
        <tr>
          <th>producto</th>
          <th>Nombre</th>
          <th>Modelo</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <img
                src={sana}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">Minatozaki Sana</p>
                <p className="text-muted mb-0"></p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Cuerpo inflable de idol</p>
            <p className="text-muted mb-0">Corea del Sur</p>
          </td>
          <td>
            <span className="badge badge-success rounded-pill d-inline">Active</span>
            <p>Quiero saber!</p>
            <p>Pulsaciones de vagina con ritmo nivel cardio</p>
          </td>
          <td>
            <div className='counter'>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              <p>$900.000</p>
            </button>
          </td>
        </tr>
        {/* Repite esta estructura para cada producto en el carrito */}
      </tbody>
    </table>
    
  );
}

export default Carro;
