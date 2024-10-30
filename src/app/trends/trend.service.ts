import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { GetAllTrendsResponse } from './models/get-all-trends-response.model';
import { GetOneTrendResponse } from './models/get-one-trend-response.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { Trend } from './models/trend.model';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;

  public readonly getAllUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches all trends from the server.
   *
   * @returns An Observable that emits an array of Trend objects.
   */
  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.getAllUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  /**
   * Fetches a single trend by its ID.
   *
   * @param id - The unique identifier of the trend to retrieve.
   * @returns An Observable that emits the retrieved Trend object.
   */
  public getOne(id: string): Observable<Trend> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  /**
   * Maps a TrendResponse object to a Trend model.
   *
   * @param trendResponse - The response object containing trend data.
   * @returns A Trend model object.
   */
  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      _id: trendResponse._id,
      body: trendResponse.body ? trendResponse.body.split('\n\n') : [],
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }

  /**
   * Creates a new trend by sending a POST request to the server.
   *
   * @param {Trend} trend - The trend object to be created.
   * @returns {Observable<Trend>} An observable that emits the created trend.
   */
  public createTrend(trend: Trend): Observable<Trend> {
    return this.httpClient
      .post<GetOneTrendResponse>(this.getAllUrl, trend)
      .pipe(map((response) => this.mapToTrendModel(response.trend)));
  }

  /**
   * Updates an existing trend.
   *
   * @param {Trend} trend - The trend object containing updated information.
   * @returns {Observable<Trend>} An observable that emits the updated trend.
   */
  public updateTrend(
    id: string | undefined,
    trend: Partial<Trend>
  ): Observable<Trend> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .put<TrendResponse>(url, trend)
      .pipe(map(this.mapToTrendModel));
  }

  /**
   * Deletes a trend by its ID.
   *
   * @param id - The unique identifier of the trend to be deleted.
   * @returns An Observable that completes when the trend is deleted.
   */
  public deleteTrend(id: string): Observable<void> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
