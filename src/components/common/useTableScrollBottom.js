import { useEffect, useRef } from "react";

/**
 * A hook that watches scroll inside an Ant Design table body, using a container with a known className.
 *
 * @param {Function} onBottomReach - Callback when scroll reaches bottom.
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

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrolledVertically = scrollTop !== previousScrollTopRef.current;
      previousScrollTopRef.current = scrollTop;

      if (!scrolledVertically) return;

      const isScrollable = scrollHeight > clientHeight;
      const isBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      if (isScrollable && isBottom) {
        onBottomReach?.();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [onBottomReach, threshold, className]);
};
