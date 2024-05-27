import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { Button } from "@mui/material";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

export default function PaymentForm() {
  const [paymentType, setPaymentType] = useState("creditCard");
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        throw new Error("Por favor, selecciona un archivo antes de enviar.");
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:3001/api/depositos",
        {
          idUsuario: localStorage.getItem("user"),
          estadoComprobante: "P",
          monto: localStorage.getItem("total"),
          image: selectedFile
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
    } catch (error) {
      alert("Error al subir el archivo: " + error.message);
    }
  };

  const PaypalnoDijango2Entrega = async () => {
    const idUser = localStorage.getItem("user");
    const costo = parseInt(localStorage.getItem("total"), 10);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/crear-pago",
        {
          idUser,
          costo,
        }
      );
      window.open(response.data.paylink, "_blank");
      console.log(response.data);
    } catch (error) {
      console.error("Error procesando pago:", error.message);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: "column", md: "row" },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === "creditCard"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "creditCard" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "creditCard" ? "background.default" : "",
            }}
          >
            <CardActionArea onClick={() => setPaymentType("creditCard")}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Transferencia</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === "bankTransfer"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "bankTransfer" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "bankTransfer" ? "background.default" : "",
            }}
          >
            <CardActionArea onClick={() => setPaymentType("bankTransfer")}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Paypal</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === "creditCard" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              height: { xs: 300, sm: 350, md: 480 },
              width: "100%",
              borderRadius: "20px",
              border: "1px solid ",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "blue",
                paddingBottom: "10px",
              }}
            >
              <Typography fontWeight="bold" variant="h6">
                Datos para transferir a FERREMAS
              </Typography>
            </Box>

            <Divider
              variant="middle"
              orientation="horizontal"
              flexItem
              className="dividerayuda"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
              }}
            >
              <Typography fontWeight="bold" variant="h6">
                Monto total a transferir:
              </Typography>
            </Box>
            <Box
              sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
            >
              <Typography fontWeight="bold" variant="h6" color={"blue"}>
                $10.000
              </Typography>
              <Typography variant="subtitle2">
                Este monto puede estar asociado a un comprobante o a la suma de
                ellos.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <Box
                sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
              >
                <Typography fontWeight="bold" variant="h6">
                  Destinatario:
                </Typography>
                <Typography variant="subtitle2">Ferremas Spa</Typography>
              </Box>
            </Box>

            <Box
              sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
            >
              <Typography fontWeight="bold" variant="h6">
                RUT:
              </Typography>
              <Typography variant="subtitle2">11.111.111-1</Typography>
            </Box>

            <Box
              sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
            >
              <Typography fontWeight="bold" variant="h6">
                Cuenta de destino (alternativas posibles):
              </Typography>
              <Typography variant="subtitle2">
                Banco Estado - Cuenta corriente 1733851
              </Typography>
            </Box>
            <Box sx={{ justifyContent: "space-between" }}>
              <Typography fontWeight="bold" variant="h6">
                E-mail:
              </Typography>
              <Typography variant="subtitle2">personas@ferremas.cl</Typography>
            </Box>
            {/* New File Upload and Submit Button */}
            <Box sx={{ mt: 2 }}>
              <input type="file" onChange={handleFileChange} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {paymentType === "bankTransfer" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            style={{
              backgroundColor: "orange",
              fontSize: "125%",
              alignItems: "center",
            }}
            onClick={PaypalnoDijango2Entrega}
          >
            Paypal <FontAwesomeIcon className="ms-3" icon={faPaypal} />
          </Button>
        </Box>
      )}
    </Stack>
  );
}
