
import React, { useEffect, useState } from "react";
import s from "./ListaEmpleados.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function Informe() {
  const [boletas, setBoletas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/boletas")
      .then((response) => setBoletas(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const invoiceSubtotal = boletas.reduce(
    (sum, boleta) => sum + boleta.totalclp,
    0
  );
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const filterBoletas = (period) => {
    const now = new Date();
    if (period === "Mensual") {
      return boletas.filter((boleta) => {
        const boletaDate = new Date(boleta.fechaBoleta);
        return (
          boletaDate.getFullYear() === now.getFullYear() &&
          boletaDate.getMonth() === now.getMonth()
        );
      });
    } else if (period === "Anual") {
      return boletas.filter(
        (boleta) => new Date(boleta.fechaBoleta).getFullYear() === now.getFullYear()
      );
    }
    return boletas;
  };

  const handleDownloadPDF = (period) => {
    const filteredBoletas = filterBoletas(period);
    const invoiceSubtotal = filteredBoletas.reduce(
      (sum, boleta) => sum + boleta.totalclp,
      0
    );
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const doc = new jsPDF();
    doc.text(`Informe de Boletas (${period})`, 10, 10);
    doc.autoTable({
      head: [["ID", "Fecha", "Monto", "Usuario"]],
      body: filteredBoletas.map((boleta) => [
        boleta.idBoleta,
        boleta.fechaBoleta,
        ccyFormat(boleta.totalclp),
        boleta.nombreCompleto,
      ]),
    });

    const finalY = doc.previousAutoTable.finalY || 10;

    // Agregar el impuesto con el porcentaje y el subtotal con el signo de dólar
    doc.text(`Impuesto: ${(TAX_RATE * 100).toFixed(0)} %`, 10, finalY + 20);
    doc.text(`Subtotal: ${ccyFormat(invoiceSubtotal)}`, 10, finalY + 30);
    doc.text(`Total: ${ccyFormat(invoiceTotal)}`, 10, finalY + 40);

    doc.save(`informe_boletas_${period.toLowerCase()}.pdf`);
  };
  
  

  return (
    <div className={s.empLista}>
      <div className={s.listaHeader}>
        <h2>Informe</h2>
      </div>
      <div className={s.listaContainer}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  Detalles
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Usuario</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boletas.map((boleta, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{boleta.idBoleta}</TableCell>
                  <TableCell>{boleta.fechaBoleta}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(boleta.totalclp)}
                  </TableCell>
                  <TableCell align="right">{boleta.nombreCompleto}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(boleta.totalclp)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <ButtonGroup className={s.ImprimirBt}>
          <DropdownButton
            as={ButtonGroup}
            title="Imprimir Informe..."
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1" onClick={() => handleDownloadPDF("Mensual")}>
              Mensual
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => handleDownloadPDF("Anual")}>
              Anual
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Informe;
