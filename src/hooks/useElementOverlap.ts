
import { RefObject, useEffect, useState } from "react";

const useElementOverlap = (
  observedElement: RefObject<Element>,
  targetElement: RefObject<Element>
): boolean => {
  const [isOverlapping, setIsOverlapping] = useState(false);

  useEffect(() => {
    if (!observedElement.current || !targetElement.current) return;

    const observed = observedElement.current;
    const target = targetElement.current;

    const checkOverlapping = () => {
      const observedRect = observed.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      if (
        observedRect.top < targetRect.bottom &&
        observedRect.bottom > targetRect.top &&
        observedRect.left < targetRect.right &&
        observedRect.right > targetRect.left
      ) {
        setIsOverlapping(true);
      } else {
        setIsOverlapping(false);
      }
    };

    checkOverlapping();

    window.addEventListener("scroll", checkOverlapping);
    window.addEventListener("resize", checkOverlapping);

    return () => {
      window.removeEventListener("scroll", checkOverlapping);
      window.removeEventListener("resize", checkOverlapping);
    };
  }, [observedElement, targetElement]);

  return isOverlapping;
};

export default useElementOverlap;
