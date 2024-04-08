import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgIf } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FaIconComponent, NgIf],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [query('@*', animateChild())]),
    ]),
    trigger('slide', [
      transition(':enter', [
        style({
          transform: 'translateY(-200%)',
        }),
        animate(200, style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate(
          200,
          style({
            transform: 'translateY(-200%)',
          }),
        ),
      ]),
    ]),
    trigger('fadeBackground', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(200, style({ opacity: 0.5 })),
      ]),
      transition(':leave', [
        style({ opacity: 0.5 }),
        animate(200, style({ opacity: 0 })),
      ]),
    ]),
  ],

  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @Input({ required: true }) container!: HTMLElement;
  // this to be able to animate the modal first render
  isModalOpen = signal(false);
  isModalOpen$ = toObservable(this.isModalOpen);
  isModalOpenDelayed = this.isModalOpen();
  protected readonly faClose = faClose;
  @Output('closeModal') closeModalEvent = new EventEmitter();

  ngOnInit(): void {
    // this.isModalOpen()
    this.isModalOpen$.subscribe((isOpen) => {
      if (isOpen) {
        // animate scaling
        this.container.style.transition = 'scale 0.2s';
        this.container.style.scale = '0.9';
      }

      if (!isOpen) {
        this.container.style.scale = '1';
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log('handleKeyDown', event.key, this.isModalOpen());
    if (!this.isModalOpen()) return;
    if (event.key !== 'Escape') return;

    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.isModalOpen.set(false);

    setTimeout(() => {
      this.isModalOpenDelayed = this.isModalOpen();
    }, 1000);
  }

  openModal() {
    this.isModalOpen.set(true);
    this.isModalOpenDelayed = this.isModalOpen();
  }
}
