import { useEffect, useRef } from "react";

/**
 * Scroll watcher for Ant Design table that triggers a callback
 * when reaching the bottom or when all content is visible.
 * It works across all screen zoom/resolution settings.
 *
 * @param {Function} onBottomReach - Callback to trigger.
 * @param {number} threshold - Buffer distance from bottom (in px).
 * @param {string} className - The className of the table's container.
 */
export const useTableScrollBottomByClassName = (
  onBottomReach,
  threshold = 0,
  className = ""
) => {
  const triggeredOnceRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const outerContainer = document.querySelector(`.${className}`);
    if (!outerContainer) {
      console.warn(`❌ Outer container not found for className: ${className}`);
      return;
    }

    const scrollContainer = outerContainer.querySelector(".ant-table-body");
    if (!scrollContainer) {
      console.warn(`❌ .ant-table-body not found inside: ${className}`);
      return;
    }

    const checkIfBottom = () => {
      const scrollTop = Math.round(scrollContainer.scrollTop);
      const scrollHeight = Math.round(scrollContainer.scrollHeight);
      const clientHeight = Math.round(scrollContainer.clientHeight);

      const atBottom = scrollTop + clientHeight >= scrollHeight - threshold - 1; // -1 for pixel rounding
      const notScrollable = scrollHeight - clientHeight <= 1; // Allow small margin

      if ((atBottom || notScrollable) && !triggeredOnceRef.current) {
        triggeredOnceRef.current = true;
        onBottomReach?.();
      }

      // Reset flag if user scrolls up
      if (!atBottom && triggeredOnceRef.current) {
        triggeredOnceRef.current = false;
      }
    };

    intervalRef.current = setInterval(checkIfBottom, 200);
    const timeoutId = setTimeout(checkIfBottom, 500); // Initial delayed check

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutId);
    };
  }, [onBottomReach, threshold, className]);
};
