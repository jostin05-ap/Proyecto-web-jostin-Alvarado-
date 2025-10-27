function validarFormulario() {
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    // Validaciones de los campos
    if (correo === "" || contrasena === "") {
        mensajeError.textContent = "Por favor, complete todos los campos.";
        return false;
    }

    // Validaciones del coreeo
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
    if (!regexCorreo.test(correo)) {
        mensajeError.textContent = "Debe ingresar un correo institucional válido (@live.uleam.edu.ec).";
        return false;
    }

    // guarda el usuario de session para ver que subio 
    localStorage.setItem("usuarioActivo", correo);

    
    window.location.href = "index5.html";
    return false; 
}

 document.addEventListener("DOMContentLoaded", () => {
        const tema = localStorage.getItem("tema") || "claro";
        if (tema === "oscuro") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        });