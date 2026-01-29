const API_URL = 'http://localhost:3000/api/tasks';

// Referencias a las listas
const listPending = document.getElementById('taskListPending');
const listDone = document.getElementById('taskListDone');
const form = document.getElementById('taskForm');

// --- REFERENCIAS AL MODAL (NUEVO) ---
const modal = document.getElementById('deleteModal');
const btnConfirm = document.getElementById('btnConfirmDelete');
const btnCancel = document.getElementById('btnCancelDelete');
let taskIdToDelete = null; // Aquí guardaremos el ID temporalmente

// 1. Función para obtener y pintar tareas (GET)
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error cargando tareas:', error);
    }
}

// 2. Función para renderizar en el DOM
function renderTasks(tasks) {
    listPending.innerHTML = ''; 
    listDone.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Estilo visual dependiendo de si está hecha o no
        const isDone = task.estado === 'done';
        const fecha = new Date(task.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // Botón de acción
        const actionButton = isDone 
            ? `<button class="btn-check" onclick="toggleTask('${task._id}', 'pending')" title="Volver a pendientes">↩️</button>`
            : `<button class="btn-check" onclick="toggleTask('${task._id}', 'done')" title="Completar">✅</button>`;

        li.innerHTML = `
            <div class="task-info">
                <div class="task-header">
                    <h3>${task.titulo}</h3>
                    <span class="task-date">${fecha}</span>
                </div>
                <p class="task-description">${task.descripcion || ''}</p>
                <div class="task-footer">
                    <span class="tech-badge">${task.tecnologia}</span>
                    <span class="status-badge ${isDone ? 'status-done' : 'status-pending'}">
                        ${isDone ? 'Completada' : 'Pendiente'}
                    </span>
                </div>
            </div>
            
            <div class="actions" style="display:flex; gap:10px;">
                ${actionButton}
                <button class="btn-delete" onclick="openDeleteModal('${task._id}')">🗑️</button>
            </div>
        `;

        if (isDone) {
            listDone.appendChild(li);
        } else {
            listPending.appendChild(li);
        }
    });
}

// --- Cambiar estado (PUT) ---
window.toggleTask = async (id, nuevoEstado) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
        });
        fetchTasks();
    } catch (error) {
        console.error('Error actualizando:', error);
    }
};

// 3. Función para guardar tarea (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const tecnologia = document.getElementById('tecnologia').value;
    const estado = document.getElementById('estado').value;

    const newTask = {
        titulo: titulo,
        descripcion: descripcion,
        tecnologia: tecnologia,
        estado: estado
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        
        form.reset();
        fetchTasks();
    } catch (error) {
        console.error('Error guardando tarea:', error);
    }
});

// --- LÓGICA DEL MODAL DE BORRADO (SUSTITUYE AL DELETE ANTERIOR) ---

// 4. Esta función solo ABRE el modal y guarda el ID
window.openDeleteModal = (id) => {
    taskIdToDelete = id; // Guardamos el ID en la variable global
    modal.classList.add('show'); // Añadimos clase CSS para mostrarlo
};

// 5. Función para cerrar el modal y limpiar
function closeModal() {
    taskIdToDelete = null;
    modal.classList.remove('show');
}

// 6. Evento: El usuario hace click en "Sí, Eliminar"
btnConfirm.addEventListener('click', async () => {
    if (taskIdToDelete) {
        try {
            await fetch(`${API_URL}/${taskIdToDelete}`, {
                method: 'DELETE'
            });
            fetchTasks(); // Recargar la lista
            closeModal(); // Cerrar modal
        } catch (error) {
            console.error('Error eliminando:', error);
        }
    }
});

// 7. Evento: El usuario hace click en "Cancelar"
btnCancel.addEventListener('click', closeModal);

// 8. Evento: Cerrar si se hace click fuera de la cajita blanca
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', fetchTasks);