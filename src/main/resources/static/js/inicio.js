document.getElementById("Empezar-juego").addEventListener("click", function () {
    Swal.fire({
        title: "Adivina el número",
        html: `
            <p>Estoy pensando en un número entre 1 y 100. ¿Cuál crees que es?</p>
            <input type="number" id="numeroUsuario" class="swal2-input" placeholder="Tu número">
        `,
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#6a11cb",
        preConfirm: async () => {
            const numero = document.getElementById("numeroUsuario").value;

            // Validar input
            if (!numero || numero < 1 || numero > 100) {
                Swal.showValidationMessage("Ingresa un número válido entre 1 y 100");
                return false;
            }

            try {
                const response = await fetch('/api/adivinar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ numero: parseInt(numero) })
                });

                const resultado = await response.json();

                return resultado.mensaje;
            } catch (error) {
                Swal.showValidationMessage("Error de conexión con el servidor");
                return false;
            }
        }
    }).then(result => {
        if (result.isConfirmed) {
            if (result.value && result.value.includes("¡Felicidades! Has adivinado el número")) {
                Swal.fire({
                    title: "¡Ganaste!",
                    text: result.value,
                    icon: "success",
                    confirmButtonText: "Jugar de nuevo",
                    confirmButtonColor: "#6a11cb"
                }).then(() => {
                    // Reiniciar el juego en el servidor solo cuando el usuario quiera jugar de nuevo
                    fetch('/api/adivinar/reiniciar', {
                        method: 'POST'
                    }).then(() => {
                        document.getElementById("Empezar-juego").click();
                    });
                });
            } else {
                Swal.fire({
                    title: "Resultado",
                    text: result.value,
                    icon: result.value && result.value.includes("correcto") ? "success" : "info",
                    confirmButtonText: "Jugar de nuevo",
                    confirmButtonColor: "#6a11cb"
                }).then(() => {
                    // Solo reinicia la interfaz, no el juego en el backend
                    document.getElementById("Empezar-juego").click();
                });
            }
    }
})});
