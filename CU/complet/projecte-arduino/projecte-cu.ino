#define PIR_PIN 12 // Pin de salida de datos del sensor PIR
#define LED_PIN 11 // Pin para el LED
#define DHT11_PIN 8 //Para el sensor DHT11

#include <dht.h> //Inlcluye la libreria, primero hay que importarla en sketch, import library with zip

dht DHT; //Variable que nos permite entrar en las funciones de la libreria.



int estadoAnterior = LOW; // Variable para guardar el estado anterior del sensor
bool ledEncendido = false; // Variable para el estado del LED

void setup() {
  pinMode(PIR_PIN, INPUT);    // Configuramos el pin como entrada
  pinMode(LED_PIN, OUTPUT);   // Configuramos el pin del LED como salida
  Serial.begin(9600);         // Iniciamos la comunicación serial
  Serial.println("Sensor PIR listo.");
}

void loop() {

  int estadoActual = digitalRead(PIR_PIN); // Leemos el estado del sensor PIR

  if (estadoActual == HIGH && estadoAnterior == LOW) {  // Detecta cambio a HIGH
    Serial.println("Movimiento detectado!");
    ledEncendido = !ledEncendido; // Alterna el estado del LED
    digitalWrite(LED_PIN, ledEncendido ? HIGH : LOW); // Enciende o apaga el LED según el estado
  }

  estadoAnterior = estadoActual; // Actualizamos el estado anterior

  DHT.read11(DHT11_PIN);

  //TEMPERATURA//
  Serial.print("Temperatura = ");
  Serial.print(DHT.temperature);
  Serial.println(" C");

  //HUMEDAD RELATIVA//
  Serial.print("Humedad = ");
  Serial.print(DHT.humidity);
  Serial.println(" %");


  delay(2000); // Espera de un segundo
}
