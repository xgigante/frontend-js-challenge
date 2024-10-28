import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { SlideOutService } from '../../slide-out/slide-out.service';
import { Trend } from '../models/trend.model';
import { Observable } from 'rxjs';
import { TrendStateEnum } from '../models/trend-states.model';

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail.component.html',
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$: Observable<Trend | null> =
    this.store.select(selectSelectedTrend);
  isSlideOutOpen: boolean = false;
  public trendState: TrendStateEnum | null = null;

  constructor(private store: Store, private slideOutService: SlideOutService) {}

  /**
   * Opens the slide-out panel with the specified mode and trend.
   * @param {boolean} editMode - Determines whether the slide-out is in edit mode or delete mode.
   * @param {Trend} [trend] - The trend data to be passed to the slide-out panel. Optional.
   */
  openSlideOut(editMode: boolean, trend?: Trend): void {
    this.trendState = editMode ? TrendStateEnum.Edit : TrendStateEnum.Delete;
    this.slideOutService.openSlideOut(trend, this.trendState);
  }
}
