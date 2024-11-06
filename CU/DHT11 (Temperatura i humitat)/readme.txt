Salida VCC al voltaje, va siempre a 5V. (Alimentación)
Salida DATA: Al puerto 8, se configura en el código, se puede cambiar.
Salida GND: Tierra, siempre al GND.
Código:

#include <dht.h> //Inlcluye la libreria, primero hay que importarla en sketch, import library with zip

dht DHT; //Variable que nos permite entrar en las funciones de la libreria.

#define DHT11_PIN 8

void setup(){
  
  Serial.begin(9600);
}

void loop()
{
  DHT.read11(DHT11_PIN);

  //TEMPERATURA//
  Serial.print("Temperatura = ");
  Serial.print(DHT.temperature);
  Serial.println(" C");

  //HUMEDAD RELATIVA//
  Serial.print("Humedad = ");
  Serial.print(DHT.humidity);
  Serial.println(" %");
  delay(2000);
}

