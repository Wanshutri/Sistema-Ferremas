<h1>Configuracion del proyecto</h1>

<h3>Instalando las dependencias del proyecto</h3>

<p>Al realizar el comando npm install en la raiz del proyecto, se va a instalar las dependencias raiz y las subcarpetas (frontend y backend), este efecto no es viceversa, por lo que si se necesita instalar una dependencia para el desarrollo y no para importar en el proyecto, debe hacerce en la subcarpeta. Por ejemplo si necesitaramos instalar la libreria de mysql, tendriamos que primero ir a la carpeta de backend (cd backend) y luego instalar la libreria (npm install mysql)</p>

<h3>Iniciando el proyecto</h3>

Para iniciar el proyecto podemos hacer npm start en la raiz, lo cual levantaria los servidores de backend y frontend simultaneamente para el desarrollo o posterior despliegue. Tambien podemos iniciar cada uno independientemente entrando en la carpeta correspondiente, en el caso de frontend con "npm start" y backend "node ./index.js"

<h1>Conexion a base de datos MYSQL</h1>

<h3>Instalando la base de datos</h3>

Para el proyecto usamos la base de datos MYSQl Community Server, el cual lo descargamos en este enlace  https://dev.mysql.com/downloads/mysql/ con el correspondiente sistema operativo.

Seguimos la siguiente configuracion:

1- Instalacion Tipica -> Instalar
2- Run MYSQL Configurator y finish
3- Data directory lo dejamos predeterminado
4- Dejamos todo como esta, incluyendo TCP, Port, X Port y Open windows firewall ports
5- En account and roles puedes poner la clave que quieras para tu cliente de base de datos, esto no va a afectar a la configuracion del proyecto (Solo puedes cambiar la contraseña, el usuario siempre sera root)
6- Configurar mysqlserver como servicio, tu decides si dejar o desmarcar si quieres que se inicie junto al sistema cuando encienda.
7- Ahora next hasta que te deje ejecutar y empiece a configurar. Luego next y termina.

#Creando la base de datos
1- Abre la terminal de mysql y escribe la contraseña que definiste. Ejecuta uno a uno cada uno de estas lineas <br>
CREATE DATABASE ferremasBD; <br>
CREATE USER 'ferremasUser'@'localhost' IDENTIFIED BY 'SistemaFerremas2024'; <br>
GRANT ALL PRIVILEGES ON ferremasBD.* TO 'ferremasUser'@'localhost'; <br>
FLUSH PRIVILEGES; <br>
USE ferremasBD; <br>
source C:\Users\DUOC\Desktop\Sistema-Ferremas\bd.sql <br>

todos deberian darte la respuesta "OK", puedes cerrar la terminal ahora
