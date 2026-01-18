const { createApp } = Vue;

createApp({
    data() {
        return {
            titulo: "",
            tipo: "",
            fecha: "",
            revista: "",
            paginas: "",
            autores: "",
            archivo: null,
            mensajeError: ""
        };
    },
    methods: {
        capturarArchivo(event) {
            this.archivo = event.target.files[0];
        },

        validarFormulario() {
            const regexTexto = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.,;:()\- ]+$/;

            if (!this.titulo || !this.tipo || !this.fecha || !this.revista || !this.paginas || !this.autores || !this.archivo) {
                this.mensajeError = "Todos los campos son obligatorios.";
                return;
            }

            if (
                !regexTexto.test(this.titulo) ||
                !regexTexto.test(this.revista) ||
                !regexTexto.test(this.autores)
            ) {
                this.mensajeError = "Campos contienen caracteres inválidos.";
                return;
            }

            if (!/^(\d+|\d+\s*-\s*\d+)$/.test(this.paginas)) {
                this.mensajeError = "Páginas inválidas. Use un número o un rango (ej: 10-20).";
                return;
            }

            if (this.archivo.type !== "application/pdf") {
                this.mensajeError = "El archivo debe ser un PDF.";
                return;
            }

            const hoy = new Date().toISOString().split("T")[0];
            if (this.fecha > hoy) {
                this.mensajeError = "La fecha no puede ser futura.";
                return;
            }

            // ✅ SOLO EL NOMBRE DEL USUARIO LOGUEADO
            const usuarioActivo = localStorage.getItem("usuarioActivo") || "Usuario desconocido";

            const nuevaProduccion = {
                id: Date.now().toString(),
                titulo: this.titulo,
                tipo: this.tipo,
                fecha: this.fecha,
                revista: this.revista,
                paginas: this.paginas,
                autores: this.autores,
                archivo: this.archivo.name,
                subidoPor: usuarioActivo
            };

            let producciones = JSON.parse(localStorage.getItem("producciones")) || [];
            producciones.push(nuevaProduccion);
            localStorage.setItem("producciones", JSON.stringify(producciones));

            alert(`✔️ Registro guardado correctamente\nSubido por: ${usuarioActivo}`);

            this.titulo = "";
            this.tipo = "";
            this.fecha = "";
            this.revista = "";
            this.paginas = "";
            this.autores = "";
            this.archivo = null;
            this.mensajeError = "";
        }
    },
    mounted() {
        const tema = localStorage.getItem("tema") || "claro";
        document.body.classList.toggle("dark-mode", tema === "oscuro");
    }
}).mount("#app");
