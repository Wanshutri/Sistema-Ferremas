import s from "./ListaPagos.module.css";
import Imagen1 from "./../../assets/img/martillo.jpg";

const Pagos = [
  {
    imagen: Imagen1,
    nombre: "Martillo",
    apellido: "#1231",
    cargo: "20-05-25",
    correo: "negrito_sabroso@gmail.com",
  },
];

const ListaPagosCrud = () => {
  return (
    <>
      <div className={s.empLista}>
        <div className={s.listaHeader}>
          <h2>Pagos</h2>
        </div>
        <div className={s.listaContainer}>
          {Pagos.map((Pagos) => (
            <div className={s.lista2}>
              <div className={s.empDetalle}>
                <img src={Pagos.imagen} alt={Pagos.nombre} />
                <h2>
                  {Pagos.nombre} {Pagos.apellido}
                </h2>
              </div>
              <span>{Pagos.cargo}</span>
              <span>{Pagos.correo}</span>
              <span className="empTodo">:</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListaPagosCrud;
