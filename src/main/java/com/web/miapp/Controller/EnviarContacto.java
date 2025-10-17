package com.web.miapp.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enviar-contacto")
public class EnviarContacto {

    @PostMapping
    public void imprimir_mensaje_recibido(@RequestBody ContactoDTO contacto) {
        System.out.println("El email es: " + contacto.getEmail() + " el nombre es " + contacto.getNombre()
                + " y el mensaje es: " + contacto.getMensaje());
    }
}