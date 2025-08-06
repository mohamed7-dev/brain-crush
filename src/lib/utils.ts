export const getNextPage = (
  total: number,
  offset: number,
  page: number,
  limit: number
) => {
  const hasMore = offset + limit < total;
  return hasMore ? page + 1 : undefined;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
