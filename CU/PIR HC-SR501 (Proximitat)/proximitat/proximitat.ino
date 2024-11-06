#define PIR_PIN 12 // Pin de salida de datos del sensor PIR
#define LED_PIN 11

int estadoAnterior = LOW; // Variable para guardar el estado anterior del sensor

void setup() {
  pinMode(PIR_PIN, INPUT);    // Configuramos el pin como entrada
  Serial.begin(9600);         // Iniciamos la comunicación serial
  Serial.println("Sensor PIR listo.");
}

void loop() {
  int estadoActual = digitalRead(PIR_PIN); // Leemos el estado del sensor PIR

  if (estadoActual == HIGH && estadoAnterior == LOW) {  // Detecta cambio a HIGH
    Serial.println("Movimiento detectado!");
    digitalWrite(LED_PIN, HIGH);
  } else if (estadoActual == LOW && estadoAnterior == HIGH) {  // Detecta cambio a LOW
    Serial.println("Sin movimiento.");
    digitalWrite(LED_PIN, LOW);
  }

  estadoAnterior = estadoActual; // Actualizamos el estado anterior
  delay(50); // Espera mínima para no saturar el puerto serie, pero asegura lectura continua
}
