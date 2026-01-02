const { createApp } = Vue;

createApp({
  data() {
    return {
      usuario: {
        cedula: "",
        nombre: "",
        correo: "",
        contrasena: ""
      },
      mensajeError: ""
    };
  },
  methods: {
    validarRegistro() {
      const { cedula, nombre, correo, contrasena } = this.usuario;

      if (!cedula || !nombre || !correo || !contrasena) {
        this.mensajeError = "Por favor, complete todos los campos.";
        return;
      }

      const formatoCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
      if (!formatoCorreo.test(correo)) {
        this.mensajeError = "Ingrese un correo institucional válido.";
        return;
      }

      if (!/^\d{10}$/.test(cedula)) {
        this.mensajeError = "La cédula debe tener 10 números.";
        return;
      }

      if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre)) {
        this.mensajeError = "El nombre solo debe contener letras.";
        return;
      }

      const usuarioJSON = {
        cedula,
        nombre,
        correo,
        contrasena
      };

      let usuarios = JSON.parse(localStorage.getItem("usuarios_registrados")) || [];
      usuarios.push(usuarioJSON);
      localStorage.setItem("usuarios_registrados", JSON.stringify(usuarios));

      this.mensajeError = "";
      alert("✅ Usuario registrado correctamente.");

      this.usuario = {
        cedula: "",
        nombre: "",
        correo: "",
        contrasena: ""
      };
    }
  },
  mounted() {
    // Aplicar tema guardado
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.toggle("dark-mode", tema === "oscuro");
  }
}).mount("#app");
