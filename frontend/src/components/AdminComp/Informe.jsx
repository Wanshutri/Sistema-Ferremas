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

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function Informe() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/api/reportesFinancieros")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const invoiceSubtotal = rows.reduce((sum, row) => sum + row.monto, 0);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
                <TableCell align="right">Valor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Usuario</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell align="right">{ccyFormat(row.monto)}</TableCell>
                  <TableCell align="right">{row.idUsuario}</TableCell>
                  <TableCell align="right">{ccyFormat(row.monto)}</TableCell>
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
            <Dropdown.Item eventKey="1">Mensual</Dropdown.Item>
            <Dropdown.Item eventKey="2">Anual</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Informe;
