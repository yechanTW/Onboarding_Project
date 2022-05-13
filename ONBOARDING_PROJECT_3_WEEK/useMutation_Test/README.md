# useMutation Test

## useMutation
useMutation이 잘 작동하는지 체크합니다. mocking이 잘 되어서 함수가 정의되었는지 체크하고 , 함수 앞뒤로 동작이 잘 되는지(함수가 호출이 잘 되는지) 체크합니다.

</br>

## beforeEach , afterEach
동일 레벨 또는 하위 레벨의 테스트가 실행되기 전 / 후에 함수를 실행합니다. 전역 상태 재설정 또는 초기화에 유용합니다. 전체 테스트 전 / 후에 한번만 실행하는 경우는 beforeAll / afterAll 을 사용해야 합니다.

</br>

## beforeAll , afterAll
동일 또는 하위 레벨의 모든 테스트가 실행 전 / 후에 함수를 실행합니다. 

</br>

## jest.mock()
특정 함수를 mocking하는 것을 넘어서 특정 모듈을 mocking할 때 사용합니다. 

</br>

## jest.requireActual
모듈의 mocking 검사를 무시하고 실제 모듈을 반환합니다.


```js
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
```
react-router-dom 모듈을 mocking하는데, 실제 모듈을 반환하며 그중 useParams를 jest.fn으로 mocking합니다. 

</br>

## toStrictEqual
toEqual 보다 더 엄격하게 비교합니다. undefined 속성이 있는 키도 확인됩니다.
