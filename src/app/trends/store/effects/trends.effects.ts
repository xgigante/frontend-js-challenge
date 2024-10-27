import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import { TrendService } from '../../trend.service';
import { HttpClient } from '@angular/common/http';
import { Trend } from '../../models/trend.model';

@Injectable()
export class TrendsEffects {
  constructor(
    private actions$: Actions,
    private trendService: TrendService,
    private http: HttpClient
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

  createTrend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendsApiActions.createTrend),
      mergeMap((action) =>
        this.http.post<{ trend: Trend }>('/v1/trends', action.trend).pipe(
          map((response) =>
            TrendsApiActions.createTrendSuccess({ trend: response.trend })
          ),
          catchError(() => of({ type: '[Trend] Create Trend Failure' }))
        )
      )
    )
  );

  updateTrend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendsApiActions.updateTrend),
      mergeMap((action) =>
        this.http
          .put<{ modified: number }>(
            `/v1/trends/${action.trend.id}`,
            action.trend
          )
          .pipe(
            map(() =>
              TrendsApiActions.updateTrendSuccess({
                trend: { ...action.trend, id: action.trend.id } as Trend,
              })
            ),
            catchError(() => of({ type: '[Trend] Update Trend Failure' }))
          )
      )
    )
  );

  deleteTrend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendsApiActions.deleteTrend),
      mergeMap((action) =>
        this.http.delete<{ success: boolean }>(`/v1/trends/${action.id}`).pipe(
          map(() => TrendsApiActions.deleteTrendSuccess({ id: action.id })),
          catchError(() => of({ type: '[Trend] Delete Trend Failure' }))
        )
      )
    )
  );
}
