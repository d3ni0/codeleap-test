import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback, hasMore, isLoading) {
  const observerRef = useRef();
  const loadMoreRef = useRef();

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, hasMore, isLoading]);

  return loadMoreRef;
}
