import { TrendProvider } from './trend-provider.model';

export interface Trend {
  _id?: string;
  title: string;
  body: string[];
  provider: TrendProvider;
  image: string;
  url: string;
  createdAt?: Date;
}
