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
      // Validación campos vacíos
      if (!this.correo || !this.contrasena) {
        this.mensajeError = "Por favor, complete todos los campos.";
        return;
      }

      // Validación correo institucional
      const regexCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
      if (!regexCorreo.test(this.correo)) {
        this.mensajeError =
          "Debe ingresar un correo institucional válido (@live.uleam.edu.ec).";
        return;
      }

      // Guardar usuario activo
      localStorage.setItem("usuarioActivo", this.correo);

      // Redirigir
      window.location.href = "index5.html";
    }
  },

  mounted() {
    // 🌙 Aplicar tema guardado
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.toggle("dark-mode", tema === "oscuro");
  }
}).mount("#app");
