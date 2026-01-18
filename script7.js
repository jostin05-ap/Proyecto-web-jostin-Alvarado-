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

      // 1️⃣ Campos obligatorios
      if (!cedula || !nombre || !correo || !contrasena) {
        this.mensajeError = "Por favor, complete todos los campos.";
        return;
      }

      // 2️⃣ Correo institucional
      const formatoCorreo = /^[a-zA-Z0-9._%+-]+@live\.uleam\.edu\.ec$/;
      if (!formatoCorreo.test(correo)) {
        this.mensajeError = "Ingrese un correo institucional válido.";
        return;
      }

      // 3️⃣ Cédula (10 dígitos)
      if (!/^\d{10}$/.test(cedula)) {
        this.mensajeError = "La cédula debe tener 10 números.";
        return;
      }

      // 4️⃣ Nombre solo letras
      if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre)) {
        this.mensajeError = "El nombre solo debe contener letras.";
        return;
      }

      // 5️⃣ Obtener usuarios existentes (MISMA CLAVE QUE GESTIÓN)
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // 6️⃣ Evitar correos duplicados
      const existe = usuarios.find(u => u.correo === correo);
      if (existe) {
        this.mensajeError = "El correo ya está registrado.";
        return;
      }

      // 7️⃣ Crear nuevo usuario
      const nuevoUsuario = {
        id: usuarios.length + 1,
        cedula,
        nombre,
        correo,
        contrasena
      };

      // 8️⃣ Guardar usuario
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // 9️⃣ Confirmación
      this.mensajeError = "";
      alert("✅ Usuario registrado correctamente.");

      // 🔟 Limpiar formulario
      this.usuario = {
        cedula: "",
        nombre: "",
        correo: "",
        contrasena: ""
      };
    }
  },

  mounted() {
    // 🌙 Aplicar tema guardado
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.toggle("dark-mode", tema === "oscuro");
  }
}).mount("#app");
