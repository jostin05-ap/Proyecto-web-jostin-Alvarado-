function validarRegistro() {
    const cedula = document.getElementById("cedula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    // Validaciones básicas
    if (!cedula || !nombre || !correo || !contrasena) {
        mensajeError.textContent = "Por favor, complete todos los campos.";
        return false;
    }

    // Validar correo institucional
    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
    if (!formatoCorreo.test(correo)) {
        mensajeError.textContent = "Ingrese un correo institucional válido (usuario@live.uleam.edu.ec).";
        return false;
    }

    // Validar cédula (solo números, 10 dígitos)
    if (!/^\d{10}$/.test(cedula)) {
        mensajeError.textContent = "La cédula debe tener 10 números.";
        return false;
    }

    // Validar nombre (solo letras y espacios)
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre)) {
        mensajeError.textContent = "El nombre solo debe contener letras.";
        return false;
    }

    mensajeError.textContent = "";
    alert("✅ Usuario registrado correctamente.");
    return false; // Evita recargar la página
}

 document.addEventListener("DOMContentLoaded", () => {
        const tema = localStorage.getItem("tema") || "claro";
        if (tema === "oscuro") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        });