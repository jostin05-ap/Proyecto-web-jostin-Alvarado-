const { createApp } = Vue;

createApp({
  data() {
    return {
      producciones: JSON.parse(localStorage.getItem("producciones")) || [],
      reportes: [],
      vista: localStorage.getItem("vistaReportes") || "tabla",
      filtros: {
        anio: "todos",
        tipo: "todos",
        autor: "",
        titulo: ""
      }
    };
  },
  methods: {
    filtrarReportes() {
      this.reportes = this.producciones.filter(p => {
        return (
          (this.filtros.anio === "todos" || p.fecha.includes(this.filtros.anio)) &&
          (this.filtros.tipo === "todos" || p.tipo === this.filtros.tipo) &&
          (this.filtros.autor === "" || p.autores.toLowerCase().includes(this.filtros.autor.toLowerCase())) &&
          (this.filtros.titulo === "" || p.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()))
        );
      });
    },
    eliminarReporte(index) {
      if (!confirm("¿Eliminar reporte?")) return;

      this.producciones.splice(index, 1);
      localStorage.setItem("producciones", JSON.stringify(this.producciones));
      this.filtrarReportes();
    }
  },
  mounted() {
    this.reportes = [...this.producciones];

    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.toggle("dark-mode", tema === "oscuro");
  }
}).mount("#app");
