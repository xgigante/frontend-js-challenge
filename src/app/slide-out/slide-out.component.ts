import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss'],
})
export class SlideOutComponent {
  @Input() isOpen: boolean | null = false;
  @Output() closeSlideOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  /**
   * Closes the slide-out component by emitting the `closeSlideOut` event.
   */
  close(): void {
    this.closeSlideOut.emit();
  }
}
