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

export type AsyncActionCallback<D, E> = {
  onMutate?: () => Promise<void> | void;
  onSuccess?: (data?: D) => Promise<void> | void;
  onError?: (error?: E) => Promise<void> | void;
  onSettled?: () => Promise<void> | void;
};
