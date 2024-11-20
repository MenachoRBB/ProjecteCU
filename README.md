
# Proyecto Monitor de Sensores

Este proyecto incluye tres componentes principales:
1. **Arduino Uno WiFi Rev2**: Recoge datos de temperatura y humedad, y los envía a una API.
2. **API**: Recibe los datos del Arduino y los almacena en una base de datos MongoDB.
3. **Aplicación Web**: Muestra los últimos datos de temperatura y humedad recibidos.

---

## Estructura del Repositorio

- `CU/Complet/projecte-arduino/projecte-cu/projecte-cu.ino`  
  Código fuente para el Arduino Uno WiFi Rev2.

- `CU/Complet/api/index.js`  
  Código fuente para la API que gestiona los datos enviados por el Arduino.

- `CU/Complet/web/`  
  Código fuente de la aplicación web construida en React.

---

## Requisitos

### Arduino:
- **Placa**: Arduino Uno WiFi Rev2.
- **Librerías**:
  - `WiFiNINA`
  - `ArduinoHttpClient`
  - `dht`

### API:
- **Lenguaje**: Node.js.
- **Dependencias**:
  - `express`
  - `mongoose`
  - `body-parser`
- **Base de datos**: MongoDB.

### Aplicación Web:
- **Framework**: React.
- **Dependencias**:
  - `axios`
  - `tailwindcss`
  - `postcss`
  - `autoprefixer`

---

## Configuración

### 1. Configuración del Arduino

1. Ve al directorio:
   ```
   CU/Complet/projecte-arduino/projecte-cu
   ```
2. Abre el archivo:
   ```
   projecte-cu.ino
   ```
3. Asegúrate de que las credenciales de Wi-Fi y la dirección IP de la API estén correctamente configuradas en el código:
   ```cpp
   const char* ssid = "TP-Link_6278";
   const char* password = "71279664";
   const char* serverAddress = "192.168.0.100";
   ```
4. Sube el código a tu placa Arduino Uno WiFi Rev2 utilizando el IDE de Arduino.

---

### 2. Configuración de la API

1. Ve al directorio:
   ```
   CU/Complet/api-arduino
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   node index.js
   ```
   La API estará disponible en `http://192.168.0.100:5000`. (O la IP que le toque)

---

### 3. Configuración de la Aplicación Web

1. Ve al directorio:
   ```
   CU/Complet/web/monitor-sensores
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```
   La web estará disponible en `http://localhost:3000`.

---

## Uso

1. Conecta el Arduino a tu red Wi-Fi.
2. Asegúrate de que la API esté corriendo y que MongoDB esté configurado correctamente.
3. Abre la aplicación web para visualizar los últimos datos recibidos.

---

## Problemas Comunes

### Arduino no se conecta al Wi-Fi
- Verifica las credenciales del Wi-Fi.
- Asegúrate de que el módulo Wi-Fi de la placa esté actualizado.

### API no responde
- Asegúrate de que MongoDB esté corriendo.
- Verifica que la API esté configurada en el puerto correcto.

### La web no muestra datos
- Revisa en la consola del navegador si hay errores relacionados con CORS.
- Asegúrate de que la API esté corriendo.

---

## Autor
Creado por Iván Menacho.
