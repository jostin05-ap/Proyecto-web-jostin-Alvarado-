// Datos simulados
const producciones = [
  { id: '01', titulo: 'Innovación educativa', anio: '2024', tipo: 'Artículo', autor: 'García F.' },
  { id: '02', titulo: 'Proyecto Smart Campus', anio: '2023', tipo: 'Proyecto', autor: 'Rodríguez A.' },
  { id: '03', titulo: 'Libro Verde ULEAM', anio: '2022', tipo: 'Libro', autor: 'Pérez L.' },
  { id: '04', titulo: 'Metodologías de enseñanza', anio: '2024', tipo: 'Artículo', autor: 'Mendoza C.' }
];

const form = document.getElementById('formReporte');
const tablaCuerpo = document.getElementById('tablaCuerpo');

// Mostrar todos los registros al inicio
mostrarResultados(producciones);

// Evento del formulario
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const anio = document.getElementById('anio').value;
  const tipo = document.getElementById('tipoRep').value;
  const autor = document.getElementById('autorRep').value.toLowerCase();

  const filtrados = producciones.filter(p => {
    const coincideAnio = (anio === 'todos' || p.anio === anio);
    const coincideTipo = (tipo === 'todos' || p.tipo === tipo);
    const coincideAutor = (autor === '' || p.autor.toLowerCase().includes(autor));
    return coincideAnio && coincideTipo && coincideAutor;
  });

  mostrarResultados(filtrados);
});

// Función para mostrar resultados en la tabla
function mostrarResultados(lista) {
  tablaCuerpo.innerHTML = '';

  if (lista.length === 0) {
    tablaCuerpo.innerHTML = '<tr><td colspan="5">No se encontraron resultados</td></tr>';
    return;
  }

  lista.forEach(p => {
    const fila = `
      <tr>
        <td>${p.id}</td>
        <td>${p.titulo}</td>
        <td>${p.anio}</td>
        <td>${p.tipo}</td>
        <td>${p.autor}</td>
      </tr>
    `;
    tablaCuerpo.innerHTML += fila;
  });
}
