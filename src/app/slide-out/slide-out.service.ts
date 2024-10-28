import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trend } from '../trends/models/trend.model';
import { TrendStateTypes } from '../trends/models/trend-states.model';

@Injectable({
  providedIn: 'root',
})
export class SlideOutService {
  private isOpenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private trendSubject = new BehaviorSubject<{
    trend?: Trend;
    state?: TrendStateTypes;
  }>({});
  isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  /**
   * Opens the slide-out component by setting the `isOpenSubject` to `true`.
   */
  openSlideOut(trend?: Trend, trendEstate?: TrendStateTypes): void {
    this.isOpenSubject.next(true);
    this.trendSubject.next({ trend, state: trendEstate });
  }

  /**
   * Closes the slide-out component by setting the `isOpenSubject` to `false`.
   */
  closeSlideOut(): void {
    this.isOpenSubject.next(false);
  }

  /**
   * Returns an observable for the trend object.
   */
  getTrend(): Observable<{ trend?: Trend; state?: TrendStateTypes }> {
    return this.trendSubject.asObservable();
  }
}
