import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlideOutService } from './slide-out.service';
import { Trend } from '../trends/models/trend.model';
import {
  TrendStateEnum,
  TrendStateTypes,
} from '../trends/models/trend-states.model';

@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss'],
})
export class SlideOutComponent implements OnInit {
  @Input() isOpen: boolean | null = false;
  @Output() closeSlideOut: EventEmitter<void> = new EventEmitter<void>();
  trend: Trend | undefined;
  trendState: TrendStateTypes = TrendStateEnum.New;
  showDeleteModal: boolean = false;

  constructor(private slideOutService: SlideOutService) {}

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
  close(): void {
    this.closeSlideOut.emit();
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
    if (this.trend && this.trend.id) {
      console.log(`Deleting trend: ${this.trend.id}`);
      this.close();
    }
    this.showDeleteModal = false;
  }

  /**
   * Cancels the delete operation by hiding the delete confirmation modal
   * and closing the slide-out component.
   */
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.close();
  }
}
