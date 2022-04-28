import { renderHook, act } from "@testing-library/react-hooks";

import useToggle from "./useToggle";

test("update state from false to true when toggle is called", () => {
  const { result } = renderHook(() => useToggle());
  // renderHook 함수 안에 Hook 함수를 넣으면 result 객체를 반환합니다.
  // result.current 를 통해 state와 toggle 함수에 접근 가능합니다.
  // result.current[0] -> 현재 state
  // result.current[1] -> toggle 함수  

  expect(result.current[0]).toBe(false);
  // 초기 상태를 false로 예측
  
  act(() => result.current[1]());
  // toggle 함수 실행

  expect(result.current[0]).toBe(true);
  // 그 이후 변경된 상태 예측
});

test("allows for initial value", () => {
  const { result } = renderHook(() => useToggle(true));
  // 초기값이 들어간 result 객체 반환

  expect(result.current[0]).toBe(true);
  // 초기값이 다른 경우 예측
});

// 컴포넌트를 이용한 테스트
// import { renderHook, act } from "@testing-library/react-hooks";

// import useToggle from "./useToggle";

// test("update state from false to true when toggle is called", () => {
//   const { result } = renderHook(() => useToggle());

//   expect(result.current[0]).toBe(false);

//   act(() => result.current[1]());

//   expect(result.current[0]).toBe(true);
// });

// test("allows for initial value", () => {
//   const { result } = renderHook(() => useToggle(true));

//   expect(result.current[0]).toBe(true);
// });

