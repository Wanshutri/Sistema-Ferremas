#!/bin/bash

# Espera a que el contenedor de MySQL esté en ejecución
until [ "$(docker inspect -f {{.State.Running}} mysqldb_ferremas)" == "true" ]; do
    echo "Esperando que el contenedor de MySQL esté en ejecución..."
    sleep 2
done

# Obtener la dirección IP del contenedor MySQL
MYSQL_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysqldb_ferremas)

# Imprimir la dirección IP del contenedor MySQL
echo "MySQL está corriendo en la dirección IP: $MYSQL_CONTAINER_IP"
