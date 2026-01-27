import { HTMLAttributeAnchorTarget, useEffect } from "react";

import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useRouter } from "next/navigation";

const prefetchedUrls = new Set<string>();

export type Prefetch = null | true | false;

export function usePrefetch({
  href,
  target,
  prefetch = null,
}: {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  prefetch?: Prefetch;
}) {
  const router = useRouter();

  useEffect(() => {
    const shouldPrefetch = !!href && target === "_self" && prefetch !== false;
    if (!shouldPrefetch) return;

    const prefetchKey = href;
    if (prefetchedUrls.has(prefetchKey)) return;
    prefetchedUrls.add(prefetchKey);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              router.prefetch(href, { kind: prefetch === null ? PrefetchKind.AUTO : PrefetchKind.FULL });
            } catch (error) {
              if (process.env.NODE_ENV !== "production") console.error("Failed to prefetch:", error);
            }
          }
        });
      },
      { rootMargin: "200px" },
    );

    requestAnimationFrame(() => {
      const element = document.querySelector(`[href="${href}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [prefetch, href, router]);
}
