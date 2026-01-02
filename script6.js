const { createApp } = Vue;

createApp({
  data() {
    return {
      tema: localStorage.getItem("tema") || "claro",
      vistaReportes: localStorage.getItem("vistaReportes") || "tabla",
      mensaje: ""
    };
  },
  methods: {
    aplicarTema() {
      if (this.tema === "oscuro") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
    guardarPreferencias() {
      localStorage.setItem("tema", this.tema);
      localStorage.setItem("vistaReportes", this.vistaReportes);

      this.aplicarTema();
      this.mensaje = "Preferencias guardadas ✅";
    }
  },
  mounted() {
    // Aplicar tema guardado al cargar la página
    this.aplicarTema();
  }
}).mount("#app");
