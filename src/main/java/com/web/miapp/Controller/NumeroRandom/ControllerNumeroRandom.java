package com.web.miapp.Controller.NumeroRandom;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/adivinar")
public class ControllerNumeroRandom {
    @PostMapping("/reiniciar")
    public java.util.Map<String, String> reiniciarJuego() {
        NumeroRandom = (int) (Math.random() * 100) + 1;
        Intentos = 0;
        JuegoTerminado = false;
        return java.util.Collections.singletonMap("mensaje", "Juego reiniciado. ¡Adivina el nuevo número!");
    }
    private int NumeroRandom = (int) (Math.random() * 100) + 1;
    private int Intentos = 0;
    private boolean JuegoTerminado = false;


    @PostMapping
    public java.util.Map<String, String> adivinarNumero(@RequestBody AdivinarRequest request) {
        int numero = request.getNumero();
        String mensaje;
        if (JuegoTerminado)  {
            mensaje = "El juego ha terminado. Reinicie para jugar de nuevo.";
        } else {
            Intentos++;
            if(NumeroRandom > numero) {
                mensaje = "El número es mayor. Intento número " + Intentos;
            } else if (NumeroRandom < numero) {
                mensaje = "El número es menor. Intento número " + Intentos;
            } else {
                JuegoTerminado = true;
                mensaje = "¡Felicidades! Has adivinado el número " + NumeroRandom + " en " + Intentos + " intentos.";
            }
        }
        return java.util.Collections.singletonMap("mensaje", mensaje);
    }
}
