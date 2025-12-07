function validarRegistro() {
    const cedula = document.getElementById("cedula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    if (!cedula || !nombre || !correo || !contrasena) {
        mensajeError.textContent = "Por favor, complete todos los campos.";
        return false;
    }

    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
    if (!formatoCorreo.test(correo)) {
        mensajeError.textContent = "Ingrese un correo institucional válido.";
        return false;
    }

    if (!/^\d{10}$/.test(cedula)) {
        mensajeError.textContent = "La cédula debe tener 10 números.";
        return false;
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre)) {
        mensajeError.textContent = "El nombre solo debe contener letras.";
        return false;
    }

    // 📌 Crear un JSON con los datos
    const usuarioJSON = {
        cedula: cedula,
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
    };

    // 📌 Guardar en localStorage como JSON
    localStorage.setItem("usuario_registrado", JSON.stringify(usuarioJSON));

    mensajeError.textContent = "";
    alert("✅ Usuario registrado correctamente.");
    return false;
}
