# Todo List App - Frontend

## [Live Demo](https://todo-list-darapti-demo-fc2fa51cedcc.herokuapp.com/dashboard)

## Estructura del Proyecto

El proyecto frontend de la aplicación de lista de tareas (Todo List) sigue una estructura modular basada en Angular. Los principales componentes y servicios se organizan de la siguiente manera:

1. **app**:
   - **dashboard.component.ts**: Este es el componente principal de la aplicación. Contiene la lógica para manejar la interfaz de usuario, incluyendo la apertura y cierre del modal, el filtrado de tareas, la adición y edición de tareas.
   - **task-list.component.ts**: Este componente es responsable de mostrar la lista de tareas, manejar el reordenamiento de tareas mediante arrastrar y soltar, y emitir eventos de edición de tareas.
   - **task-card.component.ts**: Este componente representa una tarjeta individual de tarea, mostrando la información de la tarea y manejando las interacciones como marcar como completada, editar y eliminar.
   - **modal.component.ts**: Este componente maneja la apertura y cierre del modal para crear o editar tareas.
   - **services/tasks.service.ts**: Este servicio encapsula la lógica de interacción con la API backend, incluyendo la carga de tareas, la creación de nuevas tareas, la actualización de tareas existentes y la eliminación de tareas.

## Servicio de Tareas (TasksService)

El servicio principal de la aplicación es el `TasksService`, que se encarga de manejar todas las operaciones relacionadas con las tareas. Este servicio utiliza Observables para mantener el estado de las tareas sincronizado entre los diferentes componentes de la aplicación.

### Estructura del Servicio

1. **Inyección de Dependencias**: El servicio utiliza la inyección de dependencias de Angular para obtener una instancia del `HttpClient`, que se usa para realizar las solicitudes HTTP al backend.

2. **BehaviorSubject**: El servicio define un `BehaviorSubject` llamado `tasksSubject`, que es el responsable de mantener el estado de las tareas. Este `BehaviorSubject` emite la lista de tareas cada vez que se actualiza.

3. **tasks$**: Este es un Observable público expuesto por el servicio, que permite a los componentes suscribirse a los cambios en la lista de tareas.

### Operaciones del Servicio

1. **fetchTasks()**: Este método realiza una solicitud GET al backend para obtener la lista de tareas y actualiza el `tasksSubject` con los datos recibidos.

2. **addTask(task)**: Este método realiza una solicitud POST al backend para crear una nueva tarea. Una vez que se recibe la nueva tarea desde el backend, el servicio actualiza el `tasksSubject` con la lista de tareas actualizada.

3. **updatePositionTasks(updatedPositionsTasks)**: Este método realiza una solicitud PUT al backend para actualizar las posiciones de las tareas (debido al reordenamiento). Una vez que se reciben las tareas actualizadas desde el backend, el servicio actualiza el `tasksSubject`.

4. **updateTask(task)**: Este método realiza una solicitud PUT al backend para actualizar una tarea existente. Una vez que se recibe la tarea actualizada desde el backend, el servicio actualiza el `tasksSubject` con la nueva versión de la tarea.

5. **deleteTask(task)**: Este método realiza una solicitud DELETE al backend para eliminar una tarea. Una vez que se recibe la confirmación de la eliminación desde el backend, el servicio actualiza el `tasksSubject` eliminando la tarea de la lista.

### Consumo del Servicio en los Componentes

Los componentes de la aplicación, como `DashboardComponent` y `TaskListComponent`, se suscriben al Observable `tasks$` expuesto por el `TasksService`. Cada vez que el `tasksSubject` emite una nueva lista de tareas, los componentes suscritos reciben automáticamente la actualización y pueden actualizar su interfaz de usuario en consecuencia.

Por ejemplo, en el `TaskListComponent`, se suscribe al Observable `tasks$` en el `ngOnInit()` y actualiza el signal `list` con la lista de tareas recibida:

```typescript
ngOnInit(): void {
  this.taskService.tasks$.subscribe((tasks) => {
    this.list.set(tasks.sort((a, b) => a.position - b.position));
  });
}
```

Esto permite que todos los componentes que utilizan el `TaskListComponent` reciban las actualizaciones en tiempo real sin necesidad de manejar manualmente la lógica de actualización del estado.

Trate utilizar Signals lo mas que pude ya que este es un tema no muy familiar para mi, con tal de mantener una arquitectura reactiva y declarativa, lo que facilita el mantenimiento y la escalabilidad de la aplicación a medida que crece.