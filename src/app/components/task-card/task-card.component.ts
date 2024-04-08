import { Component, input } from '@angular/core';
import { Task } from '../task-list/task-list.component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  task = input.required<Task>();
  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
}
