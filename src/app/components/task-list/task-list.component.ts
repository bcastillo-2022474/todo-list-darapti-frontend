import {
  Component,
  computed,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task, TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CdkDropList, CdkDrag, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  list = signal<Task[]>([]);
  isEmpty = computed(() => this.list().length === 0);
  taskService = inject(TasksService);
  @Output('edit-task') editTask = new EventEmitter<Task>();

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.list.set(tasks.sort((a, b) => a.position - b.position));
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
    // Update the position of each in the list
    const updatedPositionsTasks = this.list().map((task, i) => {
      task.position = i + 1;
      return task;
    });

    /*update backend*/
    try {
      this.taskService.updatePositionTasks(updatedPositionsTasks);
      // this.list.set(updatedPositionsTasks);
    } catch (error) {
      console.error(error);
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  editStatus(task: Task, is_completed: boolean) {
    this.taskService.updateTask({ ...task, is_completed });
  }

  emitEditEvent(task: Task) {
    this.editTask.emit(task);
  }
}
