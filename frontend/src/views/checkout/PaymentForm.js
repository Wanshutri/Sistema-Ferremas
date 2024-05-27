import * as React from "react";
import { useState, useEffect, result} from "react"
import Alert from "@mui/material/Alert";
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
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@mui/material";
import axios from "axios";

export default function PaymentForm() {
  const [paymentType, setPaymentType] = React.useState("creditCard");
  const userId = localStorage.getItem("user");
  const [totalPrice, setTotalPrice] = useState('0');

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  useEffect(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      setTotalPrice(storedTotalPrice);
    }
  }, []);

  const PaypalnoDijango2Entrega = async (event) => {
    console.log(totalPrice)
    const response = await axios.post("http://localhost:3001/api/crear-pago", {
        idUser: userId,
        costo: totalPrice,
      });
    console.log(response);
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
              <Typography fontWeight="bold" variant="tittle">
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
              <Typography fontWeight="bold" variant="tittle">
                Monto total a transferir:
              </Typography>
            </Box>
            <Box
              sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
            >
              <Typography fontWeight="bold" variant="tittle" color={"blue"}>
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
                <Typography fontWeight="bold" variant="tittle">
                  Destinatario:
                </Typography>
                <Typography variant="subtitle2">Ferremas Spa</Typography>
              </Box>
            </Box>

            <Box
              sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
            >
              <Typography fontWeight="bold" variant="tittle">
                RUT:
              </Typography>
              <Typography variant="subtitle2">11.111.111-1</Typography>
            </Box>

            <Box
              sx={{ justifyContent: "space-between", paddingBottom: "15px" }}
            >
              <Typography fontWeight="bold" variant="tittle">
                Cuenta de destino (alternativas posibles):
              </Typography>
              <Typography variant="subtitle2">
                Banco Santander - Cuenta corriente 61799540
              </Typography>
              <Typography variant="subtitle2">
                Banco Estado - Cuenta corriente 1733851
              </Typography>
              <Typography variant="subtitle2">
                Banco BCI - Cuenta corriente 86066854
              </Typography>
              <Typography variant="subtitle2">
                Banco Chile - Cuenta corriente 1594581405
              </Typography>
            </Box>
            <Box sx={{ justifyContent: "space-between" }}>
              <Typography fontWeight="bold" variant="tittle">
                E-mail:
              </Typography>
              <Typography variant="subtitle2">personas@ferremas.cl</Typography>
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
          <Button onClick={PaypalnoDijango2Entrega}> Paypal </Button>
          <PayPalScriptProvider
            options={{ "client-id": "AV7RbVPozcoaIgXrxjWQU5WWnGyMyZmMBfauJ16FdFEVU12RTDtFOxSNZzG2GdQUqx5wA6DMwkNR-UfZ" }}
          >
            <PayPalButtons
              
            />
          </PayPalScriptProvider>
        </Box>
      )}
    </Stack>
  );
}
