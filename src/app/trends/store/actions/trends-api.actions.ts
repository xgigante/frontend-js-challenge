import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);
export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const createTrend = createAction(
  '[Trend] Create Trend',
  props<{ trend: Trend }>()
);
export const createTrendSuccess = createAction(
  '[Trend] Create Trend Success',
  props<{ trend: Trend }>()
);

export const createTrendError = createAction('[Trend] Create Trend Error');

export const updateTrend = createAction(
  '[Trend] Update Trend',
  props<{ trend: Partial<Trend> }>()
);
export const updateTrendSuccess = createAction(
  '[Trend] Update Trend Success',
  props<{ trend: Trend }>()
);

export const updateTrendError = createAction('[Trend] Update Trend Error');

export const deleteTrend = createAction(
  '[Trend] Delete Trend',
  props<{ id: string }>()
);

export const deleteTrendSuccess = createAction(
  '[Trend] Delete Trend Success',
  props<{ id: string }>()
);

export const deleteTrendError = createAction('[Trend] Delete Trend Error');

export const clearSelectedTrend = createAction('[Trend] Clear Selected Trend');
