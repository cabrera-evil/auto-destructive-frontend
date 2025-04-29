export type ApiResponse<T = any> = {
  statusCode: number;
  message: string;
  data?: T;
};

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}
