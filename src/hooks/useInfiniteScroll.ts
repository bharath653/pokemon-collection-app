import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (onIntersect: () => void) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
          console.log("observer",entries)

      if (entries[0].isIntersecting) {
        onIntersect();
      }
    });
    console.log("observer",observer)
    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [onIntersect]);

  return loaderRef;
};
