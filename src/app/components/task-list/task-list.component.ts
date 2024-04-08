import { Component, computed, OnInit, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../task-card/task-card.component';

export type Task = {
  id: number;
  position: number;
  title: string;
  status: 'Completed' | 'Pending' | 'In Progress';
};

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

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    setTimeout(() => {
      this.list.set([
        { id: 1, position: 1, title: 'Task 1', status: 'Pending' },
        { id: 2, position: 2, title: 'Task 2', status: 'In Progress' },
        { id: 3, position: 3, title: 'Task 3', status: 'Completed' },
      ]);
    }, 0.1);
  }

  drop(event: CdkDragDrop<Task[]>) {
    const lastList = [...this.list()];
    moveItemInArray(this.list(), event.previousIndex, event.currentIndex);
    // Update the position of each in the list
    const updatedPositionsTasks = this.list().map((task, i) => {
      task.position = i;
      return task;
    });

    this.list.set(updatedPositionsTasks);

    /*update backend*/
    try {
      // fetch();
    } catch (error) {
      console.error(error);
      this.list.set(lastList);
    }
  }
}
