import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirmation-delete-modal.component.html',
})
export class ConfirmDeleteModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
