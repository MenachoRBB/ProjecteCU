Dejando los pines arriba y los potenciómetros abajo:

Izquierda: GND
Centro: Alimentación 5V
Derecha: Data, puerto 8, se puede cambiar.

Tiene dos potenciómetros que permiten variar la sensibilidad y el tiempo de activación.

Si se dejan los pines arriba y los potenciómetros abajo:

Izquierda: Ajusta el tiempo de activación (controla cuanto tiempo el sensor permanece en estado HIGH después de detectar movimiento), si se gira en sentido horario
Derecha: Ajusta la sensibilidad (rango de detección), si se gira en sentido horario aumenta la sensibilidad, por lo que detecta movimientos a distancias mayores.

Código:
#define PIR_PIN 8 // Pin de salida de datos del sensor PIR

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
  } else if (estadoActual == LOW && estadoAnterior == HIGH) {  // Detecta cambio a LOW
    Serial.println("Sin movimiento.");
  }

  estadoAnterior = estadoActual; // Actualizamos el estado anterior
  delay(50); // Espera mínima para no saturar el puerto serie, pero asegura lectura continua
}
