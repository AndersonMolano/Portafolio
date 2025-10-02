let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let mensaje = document.getElementById("mensaje");
let botonEnviar = document.getElementById("Enviar");

if (botonEnviar) {
    botonEnviar.addEventListener("click", function (event) {
        console.log("Botón enviar clickeado");
        event.preventDefault(); // Evita que se envíe el formulario real
        enviarFormulario();     // Llama al envío por fetch
    });
}

function enviarFormulario() {
    const data = {
        nombre: nombre.value,
        correo: correo.value, 
        mensaje: mensaje.value
    };

    fetch("/enviar-contacto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                title: "¡Mensaje enviado!",
                text: "Gracias por contactarnos.",
                icon: "success",
                confirmButtonColor: "#6a11cb"
            });
            nombre.value = "";
            correo.value = "";
            mensaje.value = "";
        } else {
            throw new Error("Error al enviar el mensaje"
            );
        }
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
            icon: "error",
            confirmButtonColor: "#6a11cb"
        });
    });
}