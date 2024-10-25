import { SlideOutService } from './slide-out/slide-out.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

/**
 * The AppComponent is the root component of the application.
 * It initializes several observables to track screen size and loading state.
 *
 * @property {number} currentDate - The current date and time in milliseconds since the Unix epoch.
 * @property {Observable<boolean>} isSmallScreen$ - Observable that emits true if the screen size is small.
 * @property {Observable<boolean>} isMediumScreen$ - Observable that emits true if the screen size is medium.
 * @property {Observable<boolean>} isLargeScreen$ - Observable that emits true if the screen size is large.
 * @property {Observable<boolean>} isLoading$ - Observable that emits the loading state of the application, with a delay to prevent ExpressionChangedAfterItHasBeenCheckedError.
 *
 * @constructor
 * @param {CustomBreakpointObserver} breakpointsObserver - Service to observe screen size changes.
 * @param {Store} store - NgRx store to select application state.
 */
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
    this.slideOutService.openSlideOut();
  }

  /**
   * Closes the slide-out panel by invoking the closeSlideOut method of the slideOutService.
   */
  closeSlideOut(): void {
    this.slideOutService.closeSlideOut();
  }
}
