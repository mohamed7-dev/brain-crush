import React from "react";
import { useObserver } from "@/hooks/use-observer";
import { Button, Stack, Typography } from "@mui/material";

type InfiniteLoaderProps = {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  Content?: React.ReactNode;
};
export function InfiniteLoader(props: InfiniteLoaderProps) {
  const { isFetchingNextPage, isManual, hasNextPage, Content, fetchNextPage } =
    props;
  const { targetRef, isIntersecting } = useObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  React.useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [
    isIntersecting,
    hasNextPage,
    isFetchingNextPage,
    isManual,
    fetchNextPage,
  ]);

  return (
    <Stack direction={"row"} sx={{ p: 2, justifyContent: "center" }}>
      <div ref={targetRef} style={{ height: 1 }} />
      {hasNextPage ? (
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      ) : (
        <React.Fragment>
          {Content}
          {!Content && (
            <Typography component={"p"} variant="body1">
              You have reached the end of the list
            </Typography>
          )}
        </React.Fragment>
      )}
    </Stack>
  );
}
