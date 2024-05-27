import * as React from "react";
import { useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import axios from "axios";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));



export default function AddressForm() {
  const [usuario, setUsuario] = useState({});
  
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = localStorage.getItem("user");
        const responseUsuario = await axios.get(
          `http://localhost:3001/api/usuarios/${userId}`
        );  
        setUsuario(responseUsuario.data);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };
    fetchUsuario();});


  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          Nombres
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name={`${usuario.pNombre} ${
            usuario.sNombre ? usuario.sNombre + " " : ""
          }`}
          type="name"
          placeholder={`${usuario.pNombre} ${
            usuario.sNombre ? usuario.sNombre + " " : ""
          }`}
          autoComplete="first name"
          required
          disabled
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Apellidos
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name={`${usuario.pApellido} ${usuario.sApellido}`}
          type="last-name"
          placeholder={`${usuario.pApellido} ${usuario.sApellido}`}
          autoComplete="last name"
          required
          disabled
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="direccion" required>
          Dirección
        </FormLabel>
        <OutlinedInput
          id="city"
          name={usuario.direccion}
          type="city"
          placeholder={usuario.direccion}
          autoComplete="City"
          required
          disabled
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="correo" required>
          Correo
        </FormLabel>
        <OutlinedInput
          id="state"
          name={usuario.correoUsuario}
          type="state"
          placeholder={usuario.correoUsuario}
          autoComplete="State"
          required
          disabled
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="celu" required>
          Celular
        </FormLabel>
        <OutlinedInput
          id="zip"
          name={usuario.celular}
          type="zip"
          placeholder={usuario.celular}
          autoComplete="shipping postal-code"
          required
          disabled
        />
      </FormGrid>
    </Grid>
  );
}
