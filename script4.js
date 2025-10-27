document.addEventListener("DOMContentLoaded", () => {
    const tablaCuerpo = document.getElementById('tablaCuerpo');
    const tabla = document.querySelector('.tabla-usuarios');
    const listaContainer = document.getElementById("listaReportes");

    // Leer datos de localStorage
    let producciones = JSON.parse(localStorage.getItem("producciones")) || [];

    // Obtener preferencia de vista actual
    let vista = localStorage.getItem("vistaReportes") || "tabla";

    // Mostrar resultados al cargar
    mostrarResultados(producciones, vista);

    // Filtrar por formulario
    const form = document.getElementById('formReporte');
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        const anio = document.getElementById('anio').value;
        const tipo = document.getElementById('tipoRep').value;
        const autor = document.getElementById('autorRep').value.toLowerCase();
        const titulo = document.getElementById('tituloRep')?.value.toLowerCase() || "";

        const filtrados = producciones.filter(p => {
            const coincideAnio = (anio === 'todos' || p.fecha.includes(anio));
            const coincideTipo = (tipo === 'todos' || p.tipo === tipo);
            const coincideAutor = (autor === '' || p.autores.toLowerCase().includes(autor));
            const coincideTitulo = (titulo === '' || p.titulo.toLowerCase().includes(titulo));
            return coincideAnio && coincideTipo && coincideAutor && coincideTitulo;
        });

        mostrarResultados(filtrados, vista);
    });

    function mostrarResultados(lista, tipoVista) {
        tablaCuerpo.innerHTML = '';
        listaContainer.innerHTML = '';

        if (lista.length === 0) {
            if (tipoVista === "tabla") {
                tabla.style.display = "table";
                listaContainer.style.display = "none";
                tablaCuerpo.innerHTML = '<tr><td colspan="7">No se encontraron resultados</td></tr>';
            } else {
                tabla.style.display = "none";
                listaContainer.style.display = "block";
                listaContainer.innerHTML = '<p>No se encontraron resultados</p>';
            }
            return;
        }

        if (tipoVista === "tabla") {
            tabla.style.display = "table";
            listaContainer.style.display = "none";
            lista.forEach((p, index) => {
                const fila = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${p.titulo}</td>
                        <td>${p.fecha}</td>
                        <td>${p.tipo}</td>
                        <td>${p.autores}</td>
                        <td>${p.subidoPor}</td>
                        <td>
                            <button onclick="eliminarReporte(${index})">🗑️</button>
                        </td>
                    </tr>
                `;
                tablaCuerpo.innerHTML += fila;
            });
        } else if (tipoVista === "lista") {
            tabla.style.display = "none";
            listaContainer.style.display = "block";
            lista.forEach((p, index) => {
                const item = document.createElement("div");
                item.classList.add("card");
                item.style.marginBottom = "15px";
                item.style.padding = "10px";
                item.style.textAlign = "left";
                item.innerHTML = `
                    <p><strong>ID:</strong> ${index+1}</p>
                    <p><strong>Título:</strong> ${p.titulo}</p>
                    <p><strong>Fecha:</strong> ${p.fecha}</p>
                    <p><strong>Tipo:</strong> ${p.tipo}</p>
                    <p><strong>Autor:</strong> ${p.autores}</p>
                    <p><strong>Subido por:</strong> ${p.subidoPor}</p>
                    <button onclick="eliminarReporte(${index})">Eliminar</button>
                `;
                listaContainer.appendChild(item);
            });
        }
    }

    // Función para eliminar un reporte
    window.eliminarReporte = function(index) {
        if(confirm("¿Deseas eliminar este reporte?")) {
            producciones.splice(index, 1);
            localStorage.setItem("producciones", JSON.stringify(producciones));
            // Leer vista actual desde localStorage
            const vistaActual = localStorage.getItem("vistaReportes") || "tabla";
            mostrarResultados(producciones, vistaActual);
        }
    };

    const tema = localStorage.getItem("tema") || "claro";
    if (tema === "oscuro") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});
