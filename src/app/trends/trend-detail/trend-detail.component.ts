import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { SlideOutService } from '../../slide-out/slide-out.service';
import { Trend } from '../models/trend.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail.component.html',
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$: Observable<Trend | null> =
    this.store.select(selectSelectedTrend);
  isSlideOutOpen: boolean = false;

  constructor(private store: Store, private slideOutService: SlideOutService) {}

  /**
   * Opens the slide-out panel using the slideOutService.
   * This method triggers the slide-out panel to be displayed.
   */
  openSlideOut(): void {
    this.slideOutService.openSlideOut();
  }
}
