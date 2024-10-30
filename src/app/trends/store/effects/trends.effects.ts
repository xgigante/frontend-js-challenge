import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import { TrendService } from '../../trend.service';
import { routerNavigationAction } from '@ngrx/router-store';
import { Router } from '@angular/router';

@Injectable()
export class TrendsEffects {
  constructor(
    private actions$: Actions,
    private trendService: TrendService,
    private router: Router
  ) {}

  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  createTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsApiActions.createTrend),
      mergeMap((action) =>
        this.trendService.createTrend(action.trend).pipe(
          map((trend) => TrendsApiActions.createTrendSuccess({ trend })),
          catchError((error) => {
            console.log(error);
            return of(TrendsApiActions.createTrendError({ error }));
          })
        )
      )
    );
  });

  createTrendSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrendsApiActions.createTrendSuccess),
        tap(() => {
          this.router.navigate(['/trends']);
        })
      ),
    { dispatch: false }
  );

  updateTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsApiActions.updateTrend),
      mergeMap((action) =>
        this.trendService.updateTrend(action.id, action.trend).pipe(
          map((trend) => TrendsApiActions.updateTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.updateTrendError()))
        )
      )
    );
  });

  deleteTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsApiActions.deleteTrend),
      mergeMap((action) =>
        this.trendService.deleteTrend(action.id).pipe(
          map(() => TrendsApiActions.deleteTrendSuccess({ id: action.id })),
          catchError(() => of(TrendsApiActions.deleteTrendError()))
        )
      )
    );
  });

  deleteTrendSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrendsApiActions.deleteTrendSuccess),
        tap(() => {
          this.router.navigate(['/trends']);
        })
      ),
    { dispatch: false }
  );
}
