import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { UpperCasePipe } from '@angular/common';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { Task, TasksService } from '../../services/tasks.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    FaIconComponent,
    UpperCasePipe,
    TaskListComponent,
    ModalComponent,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  title = 'Todo List';
  filterStatus: 'All' | 'Completed' | 'Pending' = "All";
  @ViewChild('titleInputElement')
  titleInputElement!: ElementRef<HTMLInputElement>;
  form = signal<{
    title: string;
    is_completed: boolean;
    isFocused: boolean;
    isEditModal: boolean;
  }>({ title: '', is_completed: false, isFocused: false, isEditModal: false });
  editingTask = signal<Task | null>(null);
  isValidForm = computed(() => this.form().title.length >= 4);
  get isCompleted() {
    return this.form().is_completed;
  }

  set isCompleted(value: boolean) {
    this.form.update((state) => ({ ...state, is_completed: value }));
  }

  get titleInput() {
    return this.form().title;
  }
  set titleInput(value: string) {
    this.form.update((state) => ({ ...state, title: value }));
  }

  tasksService = inject(TasksService);

  clearForm() {
    this.titleInput = "";
    this.isCompleted = false;
  }

  focus() {
    console.log("FOCUS")
    setTimeout(() => this.titleInputElement.nativeElement.focus(), 0);
  }

  openAddModal(modal: ModalComponent) {
    if (this.form().isEditModal) {
      console.log(this.form(), "HI");
      this.form.update((state) => ({...state, isEditModal: false}))
      this.clearForm();
    }

    modal.openModal();
    this.focus();
  }

  protected readonly faClose = faClose;
  protected readonly faChevronDown = faChevronDown;
  statusOptions = [
    { value: true, label: 'Completed' },
    { value: false, label: 'Pendiente' },
  ];

  addTask(modal: ModalComponent) {
    if (!this.isValidForm()) {
      return;
    }

    try {
      this.tasksService.addTask({
        title: this.titleInput,
        is_completed: this.isCompleted,
      });

      modal.closeModal();
      this.clearForm();
    } catch (error) {
      console.error(error);
    }
  }

  flagAsDrity() {
    this.form.update((state) => ({ ...state, isFocused: true }));
  }

  openModalEdit(task: Task, modal: ModalComponent) {
    this.form.update((state) => ({
      ...state,
      isEditModal: true,
    }));
    this.titleInput = task.title;
    this.isCompleted = task.is_completed;
    this.editingTask.set(task);
    modal.openModal();
    this.focus();
  }

  editTask(modal: ModalComponent) {
    try {
      if (!this.isValidForm()) {
        console.log(this.form());
        console.log('No valid form');
        return;
      }
      if (this.editingTask() === null) {
        console.log('No task to edit');
        console.log('WTF');
      }

      this.tasksService.updateTask({
        ...this.editingTask()!,
        title: this.form().title,
        is_completed: this.form().is_completed
      });

      modal.closeModal();
      this.form.update((state) => ({ ...state, isEditModal: false }));
      this.clearForm();
      this.editingTask.set(null);
    } catch (error) {
      console.log('error');
    }
  }

  resetModal() {
    this.form.update((state) => ({
      ...state,
      isFocused: false,
    }));
  }
}
