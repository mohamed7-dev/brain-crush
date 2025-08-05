export type SuccessFindRes<D, C = undefined> = {
  success: true;
  total: number;
  nextCursor: C;
  data: D;
  statusCode: number;
};

export type SuccessMutateRes<D = null> = {
  success: true;
  message: string;
  data: D;
  statusCode: number;
};
