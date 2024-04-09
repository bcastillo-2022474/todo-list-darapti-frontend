import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { UpperCasePipe } from '@angular/common';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    FaIconComponent,
    UpperCasePipe,
    TaskListComponent,
    ModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  title = 'Todo List';

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  openModal(modal: ModalComponent) {
    modal.openModal();
    setTimeout(() => this.titleInput.nativeElement.focus(), 0);
  }

  protected readonly faClose = faClose;
  protected readonly faChevronDown = faChevronDown;
}
