import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';

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
  currentDate = Date.now();
  isSmallScreen$ = this.breakpointsObserver.isSmall$;
  isMediumScreen$ = this.breakpointsObserver.isMedium$;
  isLargeScreen$ = this.breakpointsObserver.isLarge$;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store
  ) {}
}
