import {Component, ElementRef, HostListener, signal, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faChevronDown, faClose} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FaIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list-app';
  isModalOpen = signal(false)

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  closeModal() {
    this.isModalOpen.set(false)
  }

  openModal() {
    this.isModalOpen.set(true)
    setTimeout(() => this.titleInput.nativeElement.focus(), 0)
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isModalOpen()) return;
    if (event.key !== 'Escape') return;

    this.closeModal();
  }

  protected readonly faClose = faClose;
  protected readonly faChevronDown = faChevronDown;
}
