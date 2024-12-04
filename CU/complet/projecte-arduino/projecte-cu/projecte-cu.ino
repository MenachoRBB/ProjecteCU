#define PIR_PIN 12 // Pin de salida de datos del sensor PIR
#define LED_PIN 11 // Pin para el LED
#define DHT11_PIN 8 // Para el sensor DHT11

#include <dht.h>      // Librería del sensor DHT
#include <WiFiNINA.h> // Librería para WiFi
#include <ArduinoHttpClient.h> // Librería para HTTP

dht DHT; // Instancia del sensor DHT

// Credenciales de Wi-Fi
const char* ssid = "TP-Link_6278";         // Nombre de tu red Wi-Fi
const char* password = "71279664";         // Contraseña de tu red Wi-Fi

// Dirección de la API
const char* serverAddress = "192.168.0.100"; // Dirección IP del PC donde está la API
int port = 5000;                             // Puerto donde está corriendo la API

WiFiClient wifiClient;
HttpClient client(wifiClient, serverAddress, port);

int estadoAnterior = LOW;        // Variable para guardar el estado anterior del sensor PIR
bool ledEncendido = false;       // Variable para el estado del LED

// Tiempos para control de intervalos
unsigned long lastDHTSendTime = 0; // Último tiempo de envío del DHT
unsigned long lastPIRCheckTime = 0; // Último tiempo de lectura del PIR
const unsigned long DHTInterval = 5000; // Intervalo de envío del DHT (5 segundos)
const unsigned long PIRInterval = 1000; // Intervalo de lectura del PIR (1 segundo)

void setup() {
  pinMode(PIR_PIN, INPUT);    // Configuramos el pin como entrada
  pinMode(LED_PIN, OUTPUT);   // Configuramos el pin del LED como salida
  Serial.begin(9600);         // Iniciamos la comunicación serial
  Serial.println("Iniciando...");

  // Iniciar conexión Wi-Fi
  conectarWiFi();
}

void loop() {
  // Verificar si el Wi-Fi está conectado
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wi-Fi desconectado. Intentando reconectar...");
    conectarWiFi();
  }

  // Leer y enviar datos del sensor DHT11 cada 5 segundos
  if (millis() - lastDHTSendTime >= DHTInterval) {
    if (WiFi.status() == WL_CONNECTED) {
      enviarDatosDHT();
    }
    lastDHTSendTime = millis(); // Actualizar el tiempo del último envío
  }

  // Leer el sensor PIR cada 1 segundo
  if (millis() - lastPIRCheckTime >= PIRInterval) {
    leerSensorPIR();
    lastPIRCheckTime = millis(); // Actualizar el tiempo de la última lectura
  }
}

void conectarWiFi() {
  const unsigned long timeout = 10000; // Tiempo máximo de espera en milisegundos (10 segundos)
  unsigned long startAttemptTime = millis();

  Serial.print("Conectando a Wi-Fi...");
  WiFi.begin(ssid, password); // Intenta conectarse al Wi-Fi

  // Bucle para esperar la conexión o salir después del timeout
  while (WiFi.status() != WL_CONNECTED && (millis() - startAttemptTime) < timeout) {
    delay(1000);
    Serial.print(".");
  }

  // Verificar si se conectó o no
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConexión exitosa a Wi-Fi!");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nError: No se pudo conectar a Wi-Fi.");
  }
}

void enviarDatosDHT() {
  // Leer temperatura y humedad
  DHT.read11(DHT11_PIN);
  int temperatura = DHT.temperature;
  int humedad = DHT.humidity;

  // Crear el JSON para enviar
  String postData = "{\"temperatura\":" + String(temperatura) + ",\"humedad\":" + String(humedad) + "}";

  // Hacer la solicitud POST
  Serial.println("Enviando datos del DHT11 a la API...");
  client.beginRequest();
  client.post("/api/sensores"); // Ruta de la API
  client.sendHeader("Content-Type", "application/json");
  client.sendHeader("Content-Length", postData.length());
  client.beginBody();
  client.print(postData);
  client.endRequest();

  // Leer la respuesta del servidor
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  Serial.print("Código de estado: ");
  Serial.println(statusCode);
  Serial.print("Respuesta: ");
  Serial.println(response);
  Serial.println("temperatura:" + String(temperatura) + "humedad:" + String(humedad));
}

void leerSensorPIR() {
  int estadoActual = digitalRead(PIR_PIN);

  // Si hay movimiento detectado
  if (estadoActual == HIGH && estadoAnterior == LOW) {
    Serial.println("Movimiento detectado!");
    ledEncendido = !ledEncendido; // Alternar el estado del LED
    digitalWrite(LED_PIN, ledEncendido ? HIGH : LOW);
  }

  estadoAnterior = estadoActual; // Actualizar el estado anterior
}
