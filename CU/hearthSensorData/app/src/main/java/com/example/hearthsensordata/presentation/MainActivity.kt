package com.example.hearthsensordata.presentation

import android.Manifest
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import androidx.wear.compose.material.TimeText
import androidx.work.Data
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.example.hearthsensordata.services.HeartRateWorker

class MainActivity : ComponentActivity() {

    private lateinit var sensorManager: SensorManager
    private var heartRateSensor: Sensor? = null

    // Estado del ritmo cardíaco
    private var heartRate by mutableStateOf<Float?>(null)

    // Listener para manejar los eventos del sensor
    private val sensorEventListener: SensorEventListener = object : SensorEventListener {
        override fun onSensorChanged(event: SensorEvent?) {
            if (event?.sensor?.type == Sensor.TYPE_HEART_RATE) {
                heartRate = event.values[0] // Actualiza el estado con el ritmo cardíaco
                sendHeartRateToApi(heartRate!!.toInt()) // Envía los datos al Worker
            }
        }

        override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
    }

    // Permiso para acceder a sensores del cuerpo
    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
            if (isGranted) {
                setupHeartRateSensor()
            } else {
                println("Permiso denegado para BODY_SENSORS.")
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) == PackageManager.PERMISSION_GRANTED) {
            setupHeartRateSensor()
        } else {
            requestPermissionLauncher.launch(Manifest.permission.BODY_SENSORS)
        }

        setContent {
            WearApp(heartRate = heartRate)
        }
    }

    private fun setupHeartRateSensor() {
        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE)
        if (heartRateSensor != null) {
            sensorManager.registerListener(sensorEventListener, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL)
        } else {
            println("El sensor de ritmo cardíaco no está disponible.")
        }
    }

    private fun sendHeartRateToApi(heartRate: Int) {
        val data = Data.Builder()
            .putInt("ritmoCardiaco", heartRate)
            .build()

        val workRequest = OneTimeWorkRequestBuilder<HeartRateWorker>()
            .setInputData(data)
            .build()

        WorkManager.getInstance(this).enqueue(workRequest)
    }

    override fun onDestroy() {
        super.onDestroy()
        sensorManager.unregisterListener(sensorEventListener)
    }
}

@Composable
fun WearApp(heartRate: Float?) {
    MaterialTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colors.background),
            contentAlignment = Alignment.Center
        ) {
            TimeText()
            HeartRateDisplay(heartRate = heartRate)
        }
    }
}

@Composable
fun HeartRateDisplay(heartRate: Float?) {
    Text(
        text = if (heartRate != null) {
            "Heart Rate: ${heartRate.toInt()} BPM"
        } else {
            "Measuring Heart Rate..."
        },
        textAlign = TextAlign.Center,
        color = MaterialTheme.colors.primary
    )
}
