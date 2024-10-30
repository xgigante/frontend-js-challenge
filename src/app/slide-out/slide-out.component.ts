import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { TrendUtilsService } from '../share/trend-utils.service';
import {
  TrendStateEnum,
  TrendStateTypes,
} from '../trends/models/trend-states.model';
import { Trend } from '../trends/models/trend.model';
import {
  createTrend,
  deleteTrend,
  updateTrend,
} from '../trends/store/actions/trends-api.actions';
import { SlideOutService } from './slide-out.service';

@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss'],
})
export class SlideOutComponent implements OnInit {
  @Input() isOpen: boolean | null = false;
  @Input() isSmallScreen: boolean | null = false;
  @Output() closeSlideOut: EventEmitter<void> = new EventEmitter<void>();
  trend: Trend | undefined;
  originalTrend: Trend | undefined; // Para guardar el estado original
  trendState: TrendStateTypes = TrendStateEnum.New;
  showDeleteModal: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private slideOutService: SlideOutService,
    private store: Store,
    private router: Router,
    private trendUtilsService: TrendUtilsService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by subscribing to the trend data from the slideOutService.
   * Updates the component's trend and trendState properties based on the received data.
   */
  ngOnInit(): void {
    this.slideOutService.getTrend().subscribe(({ trend, state }) => {
      if (!trend) {
        return;
      }
      this.trend = { ...trend };
      this.originalTrend = { ...trend };
      this.trendState = state || TrendStateEnum.New;
    });
  }

  /**
   * Closes the slide-out component by emitting the `closeSlideOut` event.
   */
  closeSlide(): void {
    this.closeSlideOut.emit();
    this.errorMessage = null;
  }

  /**
   * Opens the delete modal by setting the `showDeleteModal` property to true.
   */
  openDeleteModal() {
    this.showDeleteModal = true;
  }

  /**
   * Confirms the deletion of a trend. If a trend with an ID exists, it logs the deletion
   * and closes the slide-out component. Regardless of whether a trend exists, it hides
   * the delete confirmation modal.
   */
  confirmDelete(): void {
    if (this.trend?._id) {
      console.log(`Deleting trend: ${this.trend._id}`);
      this.deleteTrend();
      this.closeSlide();
    }
    this.showDeleteModal = false;
  }

  /**
   * Cancels the delete operation by hiding the delete confirmation modal
   * and closing the slide-out component.
   */
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.closeSlide();
  }

  /**
   * Saves the current trend based on its state.
   * @param {TrendStateTypes} state - The state of the trend, indicating whether it is new or existing.
   */
  saveTrend(state: TrendStateTypes): void {
    if (this.trendUtilsService.isTrendValid(this.trend)) {
      state === TrendStateEnum.New ? this.createTrend() : this.updateTrend();
    } else {
      console.error('Trend is invalid. Unable to save.');
    }
  }

  /**
   * Creates a trend if the trend property is defined.
   * Dispatches the createTrend action with the current trend.
   * Resets the error message after dispatching the action.
   */
  private createTrend(): void {
    if (!this.trend) {
      return;
    }
    this.store.dispatch(createTrend({ trend: this.trend }));
    this.errorMessage = null;
    this.closeSlide();
  }

  /**
   * Updates the current trend with the modified fields and navigates to the trend's detail page.
   *
   * This method performs the following actions:
   * 1. Checks if the trend exists. If not, it returns early.
   * 2. Retrieves the updated fields for the trend.
   * 3. If the `body` field is an array, it joins the array elements into a single string.
   * 4. Dispatches an action to update the trend in the store if there are any updated fields.
   * 5. Navigates to the trend's detail page and reloads the window.
   * 6. Closes the slide-out component.
   */
  private updateTrend(): void {
    if (!this.trend) {
      return;
    }
    const updatedFields: Partial<Trend> =
      this.trendUtilsService.getUpdatedFields(this.trend, this.originalTrend);
    if (updatedFields.body && Array.isArray(updatedFields.body)) {
      updatedFields.body = updatedFields.body.join(' ') as any;
    }
    if (Object.keys(updatedFields).length > 0) {
      this.store.dispatch(
        updateTrend({ id: this.trend._id, trend: updatedFields })
      );
    }
    this.router.navigate(['/trends', this.trend._id]);
    this.closeSlide();
  }

  /**
   * Deletes the current trend if it has a valid ID.
   * Dispatches a delete action to the store with the trend's ID.
   * Logs an error to the console if the trend ID is undefined.
   */
  private deleteTrend(): void {
    if (this.trend?._id) {
      this.store.dispatch(deleteTrend({ id: this.trend._id }));
    } else {
      console.error('Trend ID is undefined. Unable to delete trend.');
    }
  }
}
