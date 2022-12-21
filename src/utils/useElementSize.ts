import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

export const useElementSize = ({ debounceTime = 200 } = {}) => {
  const [ref, setRef] = useState<Element | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateRect = useMemo(() => {
    return debounce((el: Element) => {
      if (el) setRect(el.getBoundingClientRect());
    }, debounceTime);
  }, [debounceTime]);

  const refFn = useCallback(
    (el: Element | null) => {
      if (el) updateRect(el);
      setRef(el);
    },
    [updateRect]
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        updateRect(entry.target);
      });
    });
    if (ref) {
      resizeObserver.observe(ref);
    }
    return () => {
      if (ref) {
        resizeObserver.unobserve(ref);
      }
    };
  }, [ref]);

  return [refFn, rect] as const;
};
