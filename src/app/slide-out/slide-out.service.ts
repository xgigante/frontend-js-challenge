import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlideOutService {
  private isOpenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  /**
   * Opens the slide-out component by setting the `isOpenSubject` to `true`.
   */
  openSlideOut(): void {
    this.isOpenSubject.next(true);
  }

  /**
   * Closes the slide-out component by setting the `isOpenSubject` to `false`.
   */
  closeSlideOut(): void {
    this.isOpenSubject.next(false);
  }
}
