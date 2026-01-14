const { createApp } = Vue;

createApp({
  methods: {
    cerrarSesion() {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "index.html";
    }
  },

  mounted() {
    // 🌙 Aplicar tema guardado
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.toggle("dark-mode", tema === "oscuro");
  }
}).mount("#app");
