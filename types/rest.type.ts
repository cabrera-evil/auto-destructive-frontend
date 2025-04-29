export interface RequestParams {
  path: string;
  payload?: Record<string, any>;
  params?: Record<string, any>;
  token?: string;
  type?: 'json' | 'form';
}
