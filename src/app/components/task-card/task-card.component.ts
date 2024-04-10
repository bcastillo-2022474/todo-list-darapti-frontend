import { Component, EventEmitter, input, Output } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { Task } from '../../services/tasks.service';

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
  @Output('edit') edit = new EventEmitter();
  @Output('delete') delete = new EventEmitter();
  @Output('checked') checked = new EventEmitter<boolean>();

  onChecked(value: Event) {
    this.checked.emit((value.target as HTMLInputElement).checked);
  }

  emitOnEdit() {
    this.edit.emit(this.task());
  }

  emitOnDelete() {
    this.delete.emit(this.task());
  }
}
