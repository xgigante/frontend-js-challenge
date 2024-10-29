import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlideOutService } from './slide-out.service';
import { Trend } from '../trends/models/trend.model';
import {
  TrendStateEnum,
  TrendStateTypes,
} from '../trends/models/trend-states.model';
import { Store } from '@ngrx/store';
import {
  createTrend,
  updateTrend,
  deleteTrend,
} from '../trends/store/actions/trends-api.actions';

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
  trendState: TrendStateTypes = TrendStateEnum.New;
  showDeleteModal: boolean = false;
  errorMessage: string | null = null;

  constructor(private slideOutService: SlideOutService, private store: Store) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by subscribing to the trend data from the slideOutService.
   * Updates the component's trend and trendState properties based on the received data.
   */
  ngOnInit(): void {
    this.slideOutService.getTrend().subscribe(({ trend, state }) => {
      this.trend = trend;
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
    if (this.trend?.id) {
      console.log(`Deleting trend: ${this.trend.id}`);
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
    if (this.isTrendValid(this.trend)) {
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
    if (this.trend) {
      this.store.dispatch(createTrend({ trend: this.trend }));
      this.resetErrorMessage();
    }
  }

  /**
   * Updates the current trend by dispatching an action to the store.
   * If the trend is defined, it will dispatch the `updateTrend` action with the current trend.
   */
  private updateTrend(): void {
    if (this.trend) {
      this.store.dispatch(updateTrend({ trend: this.trend }));
    }
  }

  /**
   * Deletes the current trend if it has a valid ID.
   * Dispatches a delete action to the store with the trend's ID.
   * Logs an error to the console if the trend ID is undefined.
   */
  private deleteTrend(): void {
    if (this.trend?.id) {
      this.store.dispatch(deleteTrend({ id: this.trend.id }));
    } else {
      console.error('Trend ID is undefined. Unable to delete trend.');
    }
  }

  /**
   * Validates if the given trend object contains all required fields and if those fields are valid.
   * @param trend - The trend object to validate. This parameter is optional.
   * @returns `true` if the trend object is valid, otherwise `false`.
   */
  private isTrendValid(trend?: Trend): boolean {
    const requiredFields: (keyof Trend)[] = [
      'title',
      'body',
      'provider',
      'image',
      'url',
    ];

    for (const field of requiredFields) {
      const value = trend?.[field];
      if (!this.isFieldValid(value)) {
        this.setErrorMessage(field);
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if the provided value is valid.
   *
   * A value is considered valid if it is not `undefined` and:
   * - If it is an array, it has at least one element.
   * - If it is a string, it is not empty after trimming whitespace.
   *
   * @param value - The value to be checked for validity.
   * @returns `true` if the value is valid, `false` otherwise.
   */
  private isFieldValid(value: any): boolean {
    return (
      value !== undefined &&
      (Array.isArray(value) ? value.length > 0 : value.trim() !== '')
    );
  }

  /**
   * Sets an error message indicating which field is required.
   * @param field - The key of the field in the Trend object that is required.
   */
  private setErrorMessage(field: keyof Trend): void {
    const fieldNames: Record<string, string> = {
      title: 'Título',
      body: 'Descripción',
      provider: 'Proveedor',
      image: 'Url Imagen',
      url: 'URL Noticia',
    };
    this.errorMessage = `Se requiere información en este campo: ${
      fieldNames[field] || field
    }`;
  }

  /**
   * Resets the error message to null.
   * This method is used to clear any existing error messages.
   */
  private resetErrorMessage(): void {
    this.errorMessage = null;
  }
}
