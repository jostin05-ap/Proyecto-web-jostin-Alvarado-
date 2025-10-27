function validarFormulario() {
    const titulo = document.getElementById("titulo").value.trim();
    const tipo = document.getElementById("tipo").value;
    const fecha = document.getElementById("fecha").value;
    const revista = document.getElementById("revista").value.trim();
    const autores = document.getElementById("autores").value.trim();
    const archivoInput = document.getElementById("archivo");
    const archivo = archivoInput.files[0];
    const mensajeError = document.getElementById("mensajeError");

    const regexTexto = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.,;:()\- ]+$/;

    if (!titulo || !tipo || !fecha || !revista || !autores || !archivo) {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return false;
    }

    if (!regexTexto.test(titulo) || !regexTexto.test(revista) || !regexTexto.test(autores)) {
        mensajeError.textContent = "Campos contienen caracteres inválidos.";
        return false;
    }

    if (archivo.type !== "application/pdf") {
        mensajeError.textContent = "El archivo debe ser un PDF.";
        return false;
    }

    const hoy = new Date().toISOString().split('T')[0];
    if (fecha > hoy) {
        mensajeError.textContent = "La fecha no puede ser futura.";
        return false;
    }

    // mantienene el usuario que incio session
    const usuarioActivo = localStorage.getItem("usuarioActivo") || "Usuario desconocido";

    // 
    const nuevaProduccion = {
        id: Date.now().toString(), // ID único
        titulo,
        tipo,
        fecha,
        revista,
        autores,
        archivo: archivo.name, // nombre del archivo
        subidoPor: usuarioActivo
    };

    // guarda utilizando localstorage
    let producciones = JSON.parse(localStorage.getItem("producciones")) || [];
    producciones.push(nuevaProduccion);
    localStorage.setItem("producciones", JSON.stringify(producciones));

    alert(`✔️ Registro guardado correctamente\nSubido por: ${usuarioActivo}`);

    document.getElementById("registroForm").reset();
    mensajeError.textContent = "";
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
 