package com.example.hearthsensordata.services

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.hearthsensordata.network.RitmoCardiacoRequest
import com.example.hearthsensordata.network.RetrofitClient
import retrofit2.HttpException
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class HeartRateWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        val heartRate = inputData.getInt("ritmoCardiaco", -1)
        if (heartRate == -1) {
            return Result.failure()
        }

        val timestamp = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(Date())

        val data = RitmoCardiacoRequest(
            ritmoCardiaco = heartRate,
            timestamp = timestamp
        )

        return try {
            val response = RetrofitClient.apiService.sendHeartRateData(data).execute()
            if (response.isSuccessful) {
                Result.success()
            } else {
                Result.retry()
            }
        } catch (e: HttpException) {
            e.printStackTrace()
            Result.retry()
        } catch (e: Exception) {
            e.printStackTrace()
            Result.failure()
        }
    }
}
