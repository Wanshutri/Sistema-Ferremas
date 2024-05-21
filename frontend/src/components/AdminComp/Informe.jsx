import React from "react";
import s from "./ListaEmpleados.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/esm/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function valorRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const valor = valorRow(qty, unit);
  return { desc, qty, unit, valor };
}

function subtotal(items) {
  return items.map(({ valor }) => valor).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Reporte 1", 122, 1.15),
  createRow("Reporte 2", 10, 45.99),
  createRow("Reporte 3", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function Informe() {
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
                <TableCell>Desc</TableCell>
                <TableCell align="right">Fecha</TableCell>
                <TableCell align="right">Cant.</TableCell>
                <TableCell align="right">Unidad</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">12/2024</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.valor)}</TableCell>
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
