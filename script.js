function validarFormulario() {
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    // Expresión regular para formato institucional de la ULEAM
    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;

    if (!formatoCorreo.test(correo)) {
        mensajeError.textContent = "Por favor, ingrese un correo institucional válido (usuario@live.uleam.edu.ec).";
        return false;
    }

    if (contrasena.length < 6) {
        mensajeError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return false;
    }

    mensajeError.textContent = "";
    alert(" Bienvenido, Inicio de sesión exitoso .");
    return false; 
}
