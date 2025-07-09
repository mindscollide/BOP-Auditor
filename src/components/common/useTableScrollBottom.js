import { useEffect, useRef } from "react";

/**
 * A hook that watches scroll inside an Ant Design table body, using a container with a known className.
 *
 * @param {Function} onBottomReach - Callback when scroll reaches bottom or all content is visible.
 * @param {number} threshold - Pixels from bottom before triggering.
 * @param {string} className - The className of the parent container of the Ant table.
 */
export const useTableScrollBottomByClassName = (
  onBottomReach,
  threshold = 0,
  className = ""
) => {
  const previousScrollTopRef = useRef(0);

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

    const handleTrigger = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      // Store scrollTop to detect vertical movement
      const scrolledVertically = scrollTop !== previousScrollTopRef.current;
      previousScrollTopRef.current = scrollTop;

      const isBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      // ✅ Trigger if either:
      // 1. User scrolled to bottom, OR
      // 2. Content is fully visible (not scrollable but more data is expected)
      if (isBottom || scrollHeight <= clientHeight) {
        onBottomReach?.();
      }
    };

    scrollContainer.addEventListener("scroll", handleTrigger);
    window.addEventListener("resize", handleTrigger); // 👈 Handle resolution change
    handleTrigger(); // 👈 Initial check in case content is fully visible

    return () => {
      scrollContainer.removeEventListener("scroll", handleTrigger);
      window.removeEventListener("resize", handleTrigger);
    };
  }, [onBottomReach, threshold, className]);
};
