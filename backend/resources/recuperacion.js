// Función para generar un código aleatorio
function generarCodigo() {
    return Math.random().toString(36).substring(7).toUpperCase();
}

// Función para enviar correo electrónico
function enviarCorreo(destinatario, codigo) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tucorreo@gmail.com', // Correo electrónico desde el cual se enviará el mensaje
            pass: 'tucontraseña' // Contraseña del correo electrónico
        }
    });

    const mailOptions = {
        from: 'tucorreo@gmail.com',
        to: destinatario,
        subject: 'Recuperación de contraseña',
        text: `Tu código de recuperación es: ${codigo}. Este código es válido por 5 minutos.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
}