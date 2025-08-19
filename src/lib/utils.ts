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

export function handleCursorPagination<T extends Array<object>>({
  data,
  limit,
}: {
  data: T;
  limit: number;
}) {
  const hasMore = data.length > limit;
  // Remove the last item if there is more data
  const items = hasMore ? data.slice(0, -1) : data;
  // Set the next cursor to the last item if there is more data
  const lastItem = items[items.length - 1];
  const nextCursor = hasMore ? lastItem : null;

  return { nextCursor, data: items } as {
    nextCursor: T[number] | undefined;
    data: T;
  };
}

export const isProduction = process.env.NODE_ENV === "production";
