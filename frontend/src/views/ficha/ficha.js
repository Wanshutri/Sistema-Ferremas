import React from "react";
import "./ficha.css"; // Archivo CSS para estilos
import bob from "./../../img/sana.jpg";
import footer from "./../../components/footer/footer";

function ProductCard() {
  return (
    <div className="product-card">
      {/* Parte 1: Foto */}
      <div className="product-photo">
        <img src={bob} alt="bob" />
      </div>

      {/* Parte 2: Detalles del producto */}
      <div className="product-details">
        <h2 className="product-title">Minatozaki Sana !</h2>
        <p className="product-description">
          No tocar, esta mujer a tenido cantidades absurdas de sexo con el
          rulos, porfavor no mostrar su secretito!
        </p>
        <p className="product-price">Precio: $1.000.000</p>
        <p className="product-stock">En stock: 1 (Lo Reservo el pipe rulos)</p>
        <div className="additional-info">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            magnam iure veniam consectetur aspernatur quod maiores distinctio
            perspiciatis ipsum? Eaque officiis at hic aliquam beatae, nostrum
            quam sit libero qui?
          </p>
        </div>
      </div>

      {/* Parte 3: Contador y opciones de compra */}
      <div className="product-actions">
        <div className="quantity">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            defaultValue="1"
          />
        </div>

        {/* Opciones de envío */}
        <div className="shipping-options">
          <label htmlFor="shipping">Opciones de envío:</label>
          <select id="shipping" name="shipping">
            <option value="despacho">Despacho a domicilio</option>
            <option value="retiro">Retiro en tienda</option>
          </select>
        </div>

        {/* Métodos de pago */}
        <div className="payment-methods">
          <p>Selecciona el método de pago:</p>
          <input
            type="radio"
            id="credit-card"
            name="payment"
            value="credit-card"
          />
          <label htmlFor="credit-card">Tarjeta de crédito</label>
          <br />
          <input type="radio" id="paypal" name="payment" value="paypal" />
          <label htmlFor="paypal">PayPal</label>
          <br />
          <input type="radio" id="cash" name="payment" value="cash" />
          <label htmlFor="cash">Pago en efectivo</label>
          <br />
        </div>

        {/* Botón de agregar al carrito */}
        <button className="add-to-cart-btn">Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductCard;
