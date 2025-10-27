document.addEventListener("DOMContentLoaded", () => {
    // Aplicar tema guardado al cargar cualquier página
    const temaGuardado = localStorage.getItem("tema") || "claro";
    if (temaGuardado === "oscuro") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Solo si estamos en la página de configuración
    const temaSelect = document.getElementById("tema");
    const vistaSelect = document.getElementById("vistaReportes");
    const configForm = document.getElementById("configForm");

    if (temaSelect && configForm) {
        // Establecer valor de selects según lo guardado
        temaSelect.value = temaGuardado;
        if (vistaSelect) {
            const vistaGuardada = localStorage.getItem("vistaReportes") || "tabla";
            vistaSelect.value = vistaGuardada;
        }

        // Guardar cambios al enviar formulario
        configForm.addEventListener("submit", e => {
            e.preventDefault();

            // Guardar tema
            const tema = temaSelect.value;
            localStorage.setItem("tema", tema);

            // Aplicar tema inmediatamente
            if (tema === "oscuro") document.body.classList.add("dark-mode");
            else document.body.classList.remove("dark-mode");

            // Guardar vista de reportes
            if (vistaSelect) {
                const vista = vistaSelect.value;
                localStorage.setItem("vistaReportes", vista);
            }

            alert("Preferencias guardadas ✅");
        });
    }
});
