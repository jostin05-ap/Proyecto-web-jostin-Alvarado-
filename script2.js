function validarFormulario() {
    const titulo = document.getElementById("titulo").value.trim();
    const tipo = document.getElementById("tipo").value;
    const fecha = document.getElementById("fecha").value;
    const revista = document.getElementById("revista").value.trim();
    const autores = document.getElementById("autores").value.trim();
    const archivoInput = document.getElementById("archivo");
    const archivo = archivoInput.files[0]; // Archivo seleccionado
    const mensajeError = document.getElementById("mensajeError");

    // Expresión regular para texto válido (letras, números, espacios y signos básicos)
    const regexTexto = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.,;:()\- ]+$/;

    // Validar campos vacíos
    if (!titulo || !tipo || !fecha || !revista || !autores || !archivo) {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return false;
    }

    // Validar campos de texto
    if (!regexTexto.test(titulo)) {
        mensajeError.textContent = "El título contiene caracteres inválidos.";
        return false;
    }

    if (!regexTexto.test(revista)) {
        mensajeError.textContent = "El nombre de la revista contiene caracteres inválidos.";
        return false;
    }

    if (!regexTexto.test(autores)) {
        mensajeError.textContent = "El campo de autores contiene caracteres inválidos.";
        return false;
    }

    // Validar que el archivo sea PDF
    if (archivo.type !== "application/pdf") {
        mensajeError.textContent = "El archivo debe ser un PDF.";
        return false;
    }

    // Validación de fecha (no futura)
    const hoy = new Date().toISOString().split('T')[0];
    if (fecha > hoy) {
        mensajeError.textContent = "La fecha no puede ser futura.";
        return false;
    }

    // Todo correcto
    mensajeError.textContent = "";
    alert(`¡Registro guardado correctamente!\nArchivo: ${archivo.name}`);
    document.getElementById("registroForm").reset();
    return false; // Evita recargar la página
}
