import { act, render } from "@testing-library/react";
import { useEffect, useRef } from "react";
import useElementOverlap from "./useElementOverlap";

const HookWrapper = ({ callback }: { callback: (isIntersecting: boolean) => void }) => {
  const observedRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useElementOverlap(observedRef, targetRef);

  useEffect(() => {
    callback(isIntersecting);
  }, [isIntersecting, callback]);

  return (
    <>
      <div ref={observedRef} data-testid="observed" style={{ position: "absolute", top: 0, left: 0, width: "100px", height: "100px" }} />
      <div ref={targetRef} data-testid="target" style={{ position: "absolute", top: "150px", left: "150px", width: "100px", height: "100px" }} />
    </>
  );
};

describe("useElementOverlap", () => {
  let observedElement: HTMLElement;
  let targetElement: HTMLElement;

  beforeEach(() => {
    observedElement = document.createElement("div");
    targetElement = document.createElement("div");

    document.body.appendChild(observedElement);
    document.body.appendChild(targetElement);

    observedElement.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      bottom: 200,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => ({})
    }));

    targetElement.getBoundingClientRect = jest.fn(() => ({
      top: 250,
      bottom: 350,
      left: 250,
      right: 350,
      width: 100,
      height: 100,
      x: 250,
      y: 250,
      toJSON: () => ({})
    }));
  });

  afterEach(() => {
    document.body.removeChild(observedElement);
    document.body.removeChild(targetElement);
  });

  test("should return false initially", () => {
    const callback = jest.fn();
    render(<HookWrapper callback={callback} />);
    expect(callback).toHaveBeenCalledWith(false);
  });

  test("should return true when elements overlap", () => {
    const callback = jest.fn();
    render(<HookWrapper callback={callback} />);

    act(() => {
      observedElement.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        bottom: 300,
        left: 100,
        right: 300,
        width: 200,
        height: 200,
        x: 100,
        y: 100,
        toJSON: () => ({})
      }));

      targetElement.getBoundingClientRect = jest.fn(() => ({
        top: 250,
        bottom: 350,
        left: 250,
        right: 350,
        width: 100,
        height: 100,
        x: 250,
        y: 250,
        toJSON: () => ({})
      }));

      window.dispatchEvent(new Event("scroll"));
    });

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(true);
    }, 0);
  });

  test("should return false when elements do not overlap", () => {
    const callback = jest.fn();
    render(<HookWrapper callback={callback} />);

    act(() => {
      observedElement.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        bottom: 150, 
        left: 100,
        right: 150, 
        width: 50,
        height: 50,
        x: 100,
        y: 100,
        toJSON: () => ({})
      }));

      targetElement.getBoundingClientRect = jest.fn(() => ({
        top: 200,
        bottom: 250, 
        left: 200,
        right: 250, 
        width: 50,
        height: 50,
        x: 200,
        y: 200,
        toJSON: () => ({})
      }));

      window.dispatchEvent(new Event("scroll"));
    });

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(false);
    }, 0);
  });
});
