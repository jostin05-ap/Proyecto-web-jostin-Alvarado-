const { createApp } = Vue;

createApp({
    data() {
        return {
            usuarios: JSON.parse(localStorage.getItem("usuarios")) || [],
            usuario: {
                id: null,
                cedula: "",
                nombre: "",
                correo: ""
            }
        };
    },
    methods: {
        guardarUsuario() {
            const regexCedula = /^[0-9]{10}$/;
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            const regexCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;

            if (!regexCedula.test(this.usuario.cedula))
                return alert("⚠️ Cédula inválida");
            if (!regexNombre.test(this.usuario.nombre))
                return alert("⚠️ Nombre inválido");
            if (!regexCorreo.test(this.usuario.correo))
                return alert("⚠️ Correo institucional inválido");

            const existente = this.usuarios.find(
                u => u.cedula === this.usuario.cedula
            );

            if (existente) {
                existente.nombre = this.usuario.nombre;
                existente.correo = this.usuario.correo;
                alert("📝 Usuario actualizado correctamente");
            } else {
                this.usuario.id = this.usuarios.length + 1;
                this.usuarios.push({ ...this.usuario });
                alert("✔️ Usuario registrado correctamente");
            }

            this.guardarStorage();
            this.limpiarFormulario();
        },
        editarUsuario(usuario) {
            this.usuario = { ...usuario };
            alert("📝 Datos cargados para editar");
        },
        eliminarUsuario(id) {
            if (!confirm("¿Eliminar usuario?")) return;

            this.usuarios = this.usuarios.filter(u => u.id !== id);
            this.usuarios.forEach((u, i) => u.id = i + 1);

            this.guardarStorage();
            alert("🗑️ Usuario eliminado");
        },
        limpiarFormulario() {
            this.usuario = { id: null, cedula: "", nombre: "", correo: "" };
        },
        guardarStorage() {
            localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
        }
    },
    mounted() {
        const tema = localStorage.getItem("tema") || "claro";
        document.body.classList.toggle("dark-mode", tema === "oscuro");
    }
}).mount("#app");
