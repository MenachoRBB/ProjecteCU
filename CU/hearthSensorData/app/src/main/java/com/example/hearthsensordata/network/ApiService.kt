package com.example.hearthsensordata.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

data class RitmoCardiacoRequest(
    val ritmoCardiaco: Int,
    val timestamp: String // En formato ISO 8601
)

interface ApiService {
    @POST("api/sensores/ritmo-cardiaco")
    fun sendHeartRateData(@Body data: RitmoCardiacoRequest): Call<Void>
}
