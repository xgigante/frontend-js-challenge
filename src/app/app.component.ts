import { SlideOutService } from './slide-out/slide-out.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';
import { Observable } from 'rxjs';
import { Trend } from './trends/models/trend.model';
import { createTrend } from './trends/store/actions/trends-api.actions';
import {
  TrendStateEnum,
  TrendStateTypes,
} from './trends/models/trend-states.model';
import { TrendProviderEnum } from './trends/models/trend-provider.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDate: number = Date.now();
  isSmallScreen$: Observable<boolean> = this.breakpointsObserver.isSmall$;
  isMediumScreen$: Observable<boolean> = this.breakpointsObserver.isMedium$;
  isLargeScreen$: Observable<boolean> = this.breakpointsObserver.isLarge$;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$: Observable<boolean> = this.store
    .select(selectIsLoadingState)
    .pipe(delay(0));
  isSlideOutOpen$: Observable<boolean> = this.slideOutService.isOpen$;
  selectedTrend: Trend = {
    title: '',
    body: [],
    provider: TrendProviderEnum.ElMundo,
    image: '',
    url: '',
  };

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store,
    private slideOutService: SlideOutService
  ) {}

  /**
   * Opens the slide-out panel using the slideOutService.
   * This method triggers the slide-out panel to become visible.
   */
  openSlideOut(): void {
    this.slideOutService.openSlideOut(
      this.selectedTrend,
      TrendStateEnum.New as TrendStateTypes
    );
  }

  /**
   * Closes the slide-out panel by invoking the closeSlideOut method of the slideOutService.
   */
  closeSlideOut(): void {
    this.slideOutService.closeSlideOut();
  }

  /**
   * Dispatches an action to create a new trend using the selected trend data.
   * This method triggers the `createTrend` action with the currently selected trend
   * as its payload. It is typically called when the user initiates the creation of a new trend.
   */
  onCreateTrend(): void {
    this.store.dispatch(createTrend({ trend: this.selectedTrend }));
  }
}
