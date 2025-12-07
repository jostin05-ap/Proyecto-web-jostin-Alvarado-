document.addEventListener("DOMContentLoaded", () => {
    const cedulaInput = document.getElementById("cedula");
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const tablaCuerpo = document.getElementById("tablaCuerpo");

    // Leer usuarios desde localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Mostrar usuarios al cargar
    mostrarUsuarios(usuarios);

    // Guardar o actualizar usuario
    document.getElementById("guardarBtn").addEventListener("click", () => {
        const cedula = cedulaInput.value.trim();
        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();
        const errores = [];

        const regexCedula = /^[0-9]{10}$/;
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;

        if (!regexCedula.test(cedula)) errores.push("⚠️ Cédula inválida (10 dígitos).");
        if (!regexNombre.test(nombre)) errores.push("⚠️ Nombre inválido (solo letras y espacios).");
        if (!regexCorreo.test(correo)) errores.push("⚠️ Correo inválido (formato institucional).");

        if (errores.length > 0) {
            alert(errores.join("\n"));
            return;
        }

        // Verificar si estamos editando
        const usuarioExistente = usuarios.find(u => u.cedula === cedula);

        if (usuarioExistente) {
            // Actualizar usuario existente
            usuarioExistente.nombre = nombre;
            usuarioExistente.correo = correo;
            alert("📝 Usuario actualizado correctamente.");
        } else {
            // Crear nuevo usuario
            const nuevoUsuario = {
                id: usuarios.length + 1,
                nombre,
                correo,
                cedula
            };
            usuarios.push(nuevoUsuario);
            alert("✔️ Usuario registrado correctamente.");
        }

        // Guardar en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Limpiar inputs
        cedulaInput.value = "";
        nombreInput.value = "";
        correoInput.value = "";

        // Actualizar tabla
        mostrarUsuarios(usuarios);
    });

    // Función para mostrar usuarios
    function mostrarUsuarios(tabla) {
        tablaCuerpo.innerHTML = "";
        if (tabla.length === 0) {
            tablaCuerpo.innerHTML = '<tr><td colspan="4">No hay usuarios registrados</td></tr>';
            return;
        }

        tabla.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>               
                <td>${usuario.correo}</td>
                <td>${usuario.cedula}</td>
                <td>
                    <button class="icono-boton editar"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="icono-boton eliminar"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;

            // Botón eliminar
            fila.querySelector(".eliminar").addEventListener("click", () => {
                if (confirm(`¿Eliminar al usuario ${usuario.nombre}?`)) {
                    usuarios = usuarios.filter(u => u.id !== usuario.id);
                    // Reenumerar IDs
                    usuarios.forEach((u, index) => u.id = index + 1);
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    mostrarUsuarios(usuarios);
                    alert("🗑️ Usuario eliminado correctamente.");
                }
            });

            // Botón editar
            fila.querySelector(".editar").addEventListener("click", () => {
                nombreInput.value = usuario.nombre;
                correoInput.value = usuario.correo;
                cedulaInput.value = usuario.cedula;
                alert("📝 Datos cargados para editar.");
            });

            tablaCuerpo.appendChild(fila);
        });
    }
});

 document.addEventListener("DOMContentLoaded", () => {
        const tema = localStorage.getItem("tema") || "claro";
        if (tema === "oscuro") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        });