import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config';
import { BehaviorSubject, map } from 'rxjs';

export type Task = {
  id: number;
  position: number;
  title: string;
  is_completed: boolean;
  created_at: string;
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  http = inject(HttpClient);
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http
      .get<{ length: number; data: Task[] }>(`${API_URL}/task`)
      .pipe(map((response) => response.data))
      .subscribe((tasks) => {
        console.log(tasks);
        this.tasksSubject.next(tasks);
      });
  }

  addTask(task: { title: string; is_completed: boolean }) {
    this.http.post<Task>(`${API_URL}/task`, task).subscribe((newTask) => {
      const currentTasks = this.tasksSubject.getValue();
      this.tasksSubject.next([...currentTasks, newTask]);
    });
  }

  updatePositionTasks(
    updatedPositionsTasks: { id: number; position: number }[],
  ) {
    this.http
      .put<{
        length: number;
        message: string;
        data: Task[];
      }>(`${API_URL}/task`, { tasks: updatedPositionsTasks })
      .subscribe((tasks) => {
        this.tasksSubject.next(tasks.data);
      });
  }

  updateTask(task: Task) {
    console.log(task);
    this.http
      .put<Task>(`${API_URL}/task/${task.id}`, task)
      .subscribe((task) => {
        // update oberservable
        const currentTasks = this.tasksSubject.getValue();
        const index = currentTasks.findIndex((t) => t.id === task.id);
        currentTasks[index] = task;
        this.tasksSubject.next([...currentTasks]);
      });
  }

  deleteTask(task: Task) {
    this.http.delete<Task>(`${API_URL}/task/${task.id}`).subscribe(() => {
      this.tasksSubject.next(
        this.tasksSubject.getValue().filter((t) => t.id !== task.id),
      );
    });
  }
}
