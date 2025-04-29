'use server';

import { RestService } from '@/services/rest.service';
import { RequestParams } from '@/types/rest.type';

// Create a singleton instance of RestService
const restService = RestService.getInstance();

// Export individual async functions
export const create = async (params: RequestParams) => {
  const { data: response } = await restService.create(params);
  return response.data;
};

export const list = async (params: RequestParams) => {
  const { data: response } = await restService.list(params);
  return response.data;
};

export const update = async (params: RequestParams) => {
  const { data: response } = await restService.update(params);
  return response.data;
};

export const remove = async (params: RequestParams) => {
  const { data: response } = await restService.remove(params);
  return response.data;
};
