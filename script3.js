document.addEventListener("DOMContentLoaded", () => {
    const cedulaInput = document.getElementById("cedula");
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");

    // Validar al hacer clic en Guardar
    document.getElementById("guardarBtn").addEventListener("click", () => {
        const cedula = cedulaInput.value.trim();
        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();
        const errores = [];

        const regexCedula = /^[0-9]{10}$/;
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;

        if (!regexCedula.test(cedula)) errores.push("⚠️ Cédula inválida (10 dígitos numéricos).");
        if (!regexNombre.test(nombre)) errores.push("⚠️ Nombre inválido (solo letras y espacios).");
        if (!regexCorreo.test(correo)) errores.push("⚠️ Correo inválido (formato institucional).");

        if (errores.length > 0) {
            alert(errores.join("\n"));
        } else {
            alert("✔️ Todos los datos son válidos.");
        }
    });

    // Funciones de editar y eliminar
    document.addEventListener("click", e => {
        if (e.target.closest(".eliminar")) {
            const fila = e.target.closest("tr");
            if (confirm("¿Seguro que quieres eliminar este usuario?")) {
                fila.remove();
                alert("🗑️ Usuario eliminado correctamente.");
            }
        }

        if (e.target.closest(".editar")) {
            const fila = e.target.closest("tr");
            const datos = fila.querySelectorAll("td");
            nombreInput.value = datos[0].textContent;
            correoInput.value = datos[1].textContent;
            cedulaInput.value = datos[2].textContent;
            alert("📝 Datos cargados para editar.");
        }
    });
});
