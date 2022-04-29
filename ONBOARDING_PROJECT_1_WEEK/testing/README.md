# React Hooks Testing Library (리액트 훅 테스트)

### [공식 문서](https://react-hooks-testing-library.com/)

</br>

## 목차

1. [테스팅을 하는 이유](#테스팅을-하는-이유)
2. [단위 테스트](#단위-테스트)
3. [React Hooks Testing Library](#react-hooks-testing-library)
4. [설치 및 실행](#설치-및-실행)
5. [parameterized test](#parameterized-test)
6. [참고 자료](#참고-자료)

</br>

## 테스팅을 하는 이유
테스팅은 작은 의미로써 "**정상 작동 여부**" 를 판단하는 것에서 , 현재의 테스팅은 **요구사항을 만족시키는지 확인**하고 , **결함을 발견**하고 **앞으로 생길 결함을 방지**하는 역할을 합니다.

</br>

## 단위 테스트
단위 테스트는 모듈이나 어플리케이션 안에 있는 **개별적인 코드 단위**가 예상대로 작동하는지를 확인하는 방법입니다. 리액트의 예로는 component 혹은 hook 이 단위가 될 수 있습니다. 이 개별적인 코드 단위들을 독립적으로 테스트하기 때문에 여러가지 이점들이 있습니다.

1. 빠르게 테스팅이 가능하고 , 다른 코드를 리팩토링해도 빠르게 문제 여부를 파악할 수 있습니다.
2. 새로운 기능 추가시에 빠르게 테스트할 수 있습니다.
3. 리팩토링 시 안정성을 확보할 수 있고, 코드에 대한 문서가 될 수 있습니다.

그래서 요즘 많이 사용되는 TDD(Test-Driven Development, 테스트 주도 개발)에서 이야기하는 테스트도 단위 테스트를 의미합니다. 테스트 코드를 수시로 빠르게 돌리면서 문제점을 파악해 나갑니다.

</br>

## React Hooks Testing Library 

React 16.8 버전에서 Hook이 나온 이후로 , 많은 custom Hook이 생겨나고 사용되고 있습니다. 이 Hook을 테스트하는 라이브러리가 React Hooks Testing Library 입니다. 그 전에 테스트에서는 component를 생성하고 , 그 안에서 hook을 실행해서 간접적으로 테스팅했습니다. 하지만 이 경우에는 테스팅 목적으로 실제 사용하지 않는 불필요한 component를 작성해야 하기 때문에 hook이 많아지는 경우 적합하지 않습니다. React Hooks Testing Library 를 사용하면 component의 도움 없이도 hook을 직접 테스트할 수 있습니다.

```js
import { useState, useCallback } from "react";

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggle;
```
<div align="center">
toggle을 위한 hook
</div>

</br>

toggle을 하는 hook입니다. 기존에는 이 hook을 테스팅하기 위해서는 component를 만들고 , component를 실행해서 확인해야 했습니다.

```js
import useToggle from "./useToggle";

function ToggleButton({ initial = false }) {
  const [on, toggle] = useToggle(initial);

  return <button onClick={toggle}>{on ? "ON" : "OFF"}</button>;
}

export default ToggleButton;
```
<div align="center">
테스팅을 위한 component
</div>

</br>

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToggleButton from "./ToggleButton";

test("button text changes from ON to OFF when clicked", () => {
  render(<ToggleButton />);

  const button = screen.getByRole("button");

  expect(button).toHaveTextContent("OFF");

  userEvent.click(button);

  expect(button).toHaveTextContent("ON");
});

test("button text is ON given initial set to true", () => {
  render(<ToggleButton initial={true} />);

  expect(screen.getByRole("button", { name: /on/i })).toBeInTheDocument();
});
```

<div align="center">
직접 실행 후 true / false를 확인
</div>

</br>

버튼을 클릭 후 , 화면에 문구를 확인하는 방식이었습니다. 간단한 hook에서는 어찌 진행한다지만 , hook이 복잡해지고 개수가 많아지면 모든 hook을 이런식으로 하다가는 불필요한 component가 너무 많이 생기고 불편합니다. 이떄 React Hooks Testing Library 를 사용하면 component없이 직접 테스트가 가능합니다.

</br>

## 설치 및 실행

```shell
$ npm i -D @testing-library/react-hooks
```


```js
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
```

React Hooks Testing Library를 사용한 테스팅 입니다. npm을 이용해 설치할 수 있고 , component없이 직접 테스트 할 수 있습니다. 

</br>

## parameterized test

첫 Test PR을 날려보고 그 이후에 새로 알게된 내용입니다. 기존 코드를 예시로 들면

```js
const CASES = [
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
];
it.each(CASES)(
  'hook 인자(input)와 state 초기값(expected)은 동일하다',
  ({ input, expected }) => {
    const { result } = renderHook(() => useCustomHook(input));
    expect(result.current.selectedIndex).toEqual(expected);
  },
);
```

Case를 만들어서 결과를 산출하는 방법이었습니다. 다만 이 방법의 문제는 케이스별로 넘버를 매길 수 없고, 개수가 많아지는 경우에는 불편한 경우가 있었습니다. 이 경우를 parameterized test 로 변경한다면

```js
it.each`
  #    | index | selectedIndex
  ${1} | ${0}  | ${0}
  ${2} | ${0}  | ${0}
  ${3} | ${1}  | ${1}
  ${4} | ${1}  | ${1}
`(
  'case $#) useCustomHook($index) 일 때 `selectedIndex`의 초기 값은 $index 이다',
  ({ index, selectedIndex }) => {
    const { result } = renderHook(() => useCustomHook(index));
    expect(result.current.selectedIndex).toEqual(selectedIndex);
  },
);
```

이런식으로 테이블 형태로 변경이 가능한데, 이렇게 되면 실제로 Test에서 무엇을 어떻게 테스트하고 어떤식으로 예측이 되는지 쉽게 파악이 될 뿐만 아니라 , 실제 테스트 결과가 케이스 형태로 나오게 되어서 훨씬 파악하기 쉬웠습니다. 테스트를 쉽게 인식하고 쉽게 수정할 수 있는 목적에 더 맞는 것 같아서 더 효율적인 방법인 것 같습니다.

</br>


## 참고 자료
https://rok93.tistory.com/entry/%EC%8A%A4%EB%AC%B4%EB%94%94-%ED%95%9C-%EC%9E%94-%EB%A7%88%EC%8B%9C%EB%A9%B0-%EB%81%9D%EB%82%B4%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-TDD-4%EC%9E%A5-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-react-testing-library

https://www.daleseo.com/react-hooks-testing-library/
