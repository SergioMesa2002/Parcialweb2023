function cargarDatosEnTabla() {
    fetch('towns.json') // Realizar una solicitud para cargar el archivo JSON
        .then(response => response.json()) // Parsear la respuesta como JSON
        .then(data => {
            const tablaDatos = document.getElementById('tabla-datos');
            const tbody = tablaDatos.querySelector('tbody');

            // Obtener los valores de los filtros
            const filtroDepartamento = document.getElementById('filtro-departamento').value.trim().toLowerCase();
            const filtroNombre = document.getElementById('filtro-nombre').value.trim().toLowerCase();

            // Limpiar la tabla antes de agregar datos filtrados
            tbody.innerHTML = '';

            // Iterar a través de los datos y agregar filas a la tabla si coinciden con los filtros
            data.forEach(item => {
                const nombreCompleto = (item.department + ' ' + item.name).toLowerCase();

                if (nombreCompleto.includes(filtroDepartamento) && nombreCompleto.includes(filtroNombre)) {
                    const row = document.createElement('tr');
                    const codigoCell = document.createElement('td');
                    codigoCell.textContent = item.code;
                    const departamentoCell = document.createElement('td');
                    departamentoCell.textContent = item.department;
                    const nombreCell = document.createElement('td');
                    nombreCell.textContent = item.name;

                    row.appendChild(codigoCell);
                    row.appendChild(departamentoCell);
                    row.appendChild(nombreCell);

                    tbody.appendChild(row);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Agregar evento de clic al botón de filtrar
const filtrarButton = document.getElementById('filtrar-button');
filtrarButton.addEventListener('click', cargarDatosEnTabla);

// Agregar eventos de cambio para los campos de filtro
const filtroDepartamento = document.getElementById('filtro-departamento');
const filtroNombre = document.getElementById('filtro-nombre');

filtroDepartamento.addEventListener('input', cargarDatosEnTabla);
filtroNombre.addEventListener('input', cargarDatosEnTabla);

// Llamar a la función para cargar los datos en la tabla al cargar la página
cargarDatosEnTabla();