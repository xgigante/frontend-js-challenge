import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlideOutComponent } from './slide-out.component';
import { ConfirmDeleteModalComponent } from './confirmation-delete-modal/confirmation-delete-modal.component';

@NgModule({
  declarations: [ConfirmDeleteModalComponent],
  imports: [CommonModule],
  exports: [ConfirmDeleteModalComponent],
})
export class SlideOutModule {}
