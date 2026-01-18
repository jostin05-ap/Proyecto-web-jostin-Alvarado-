const { createApp } = Vue;

createApp({
  data() {
    return {
      correo: "",
      contrasena: "",
      mensajeError: ""
    };
  },

  methods: {
    iniciarSesion() {

      if (!this.correo || !this.contrasena) {
        this.mensajeError = "Por favor, complete todos los campos.";
        return;
      }

      const regexCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
      if (!regexCorreo.test(this.correo)) {
        this.mensajeError =
          "Debe ingresar un correo institucional válido (@live.uleam.edu.ec).";
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      if (usuarios.length === 0) {
        this.mensajeError = "No existen usuarios registrados. Cree una cuenta primero.";
        return;
      }

      const usuarioValido = usuarios.find(
        u => u.correo === this.correo && u.contrasena === this.contrasena
      );

      if (!usuarioValido) {
        this.mensajeError = "Correo o contraseña incorrectos.";
        return;
      }

      // ✅ SOLO EL NOMBRE
      localStorage.setItem("usuarioActivo", usuarioValido.nombre);

      window.location.href = "index5.html";
    }
  },

  mounted() {
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.toggle("dark-mode", tema === "oscuro");
  }
}).mount("#app");
