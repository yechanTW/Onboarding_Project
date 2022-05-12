# Jest

Test 관련 도구들을 제공해주는 테스팅 프레임워크입니다. Test Runner , Test Matcher , Test Mock 까지 제공해 줍니다.

</br>

## React Testing Library 

기존 구현 위주의 Enzyme를 대신해서 나온 기능 기반의 테스트 도구로 , React 에서 컴포넌트를 테스트하기 위해서 만들어진 도구입니다. 

</br>

## @Testing-library/jest-dom

RTL은 요소를 렌더링하는 부분을 다루고 , 실제 Dom의 노드들을 테스트하는 것은 jest 입니다. jest 자체적으로 기능 테스트를 할 수 있지만 , 리액트의 컴포넌트를 렌더링하고 테스트하기 위해서는 RTL의 기능이 필요합니다. 그래서 리액트 내부의 테스트 코드 작성 방식은 jest와 상당 부분 유사합니다.

</br>

## MockedProvider

apollo-client를 사용하는 리액트 구성 요소를 테스트 하기 위한 요소로 , 테스트에서 GraphQL 서버와 통신할 필요 없이 개별 쿼리에 대한 mock 응답을 정의해줍니다. 

</br>

## Jest Mocking

가짜 함수 ( mock function ) 을 만드는 jest.fn() 을 사용해서 만들 수 있습니다 . mockReturnValue()를 사용하면 리턴할 값을 정할 수 있습니다. mockImplementation은 즉석에서 동작하는 모킹 함수를 만들 수 있습니다.

```js
const mockFn = jest.fn();
mockFn.mockReturnValue('Hello World');
console.log(mockFn());  // Hello World

mockFn.mockImplementation((name) => `Hello ${name}`);
console.log(mockFn('world'));   // Hello world
```

</br>

## Query Mocking
graphQL 쿼리는 useQuery를 이용해 서버와 통신하는데 , 서버가 없이도 가짜 data를 만들어서 테스트하기 위한 과정입니다. 

```js
const MOCK_DATA = {
    request: { 
        query: /*query가 들어갈 자리*/, 
        variables: /*인자가 들어가는 자리*/
    },
    result: {
      data : {
          // 쿼리의 결과로 만들어진 데이터가 들어가는 자리
      }
    },
  };
```
쿼리와 인자를 넣고 , 반환 결과를 mocking해 줍니다. 이렇게 되면 서버가 없이도 mocking 데이터가 나와서 테스팅할 수 있습니다.


</br>

## Jest.spyOn()

jest.fn() 과 비슷하지만 , fn은 함수의 구현을 가짜로 대체한다면 spyOn은 가짜로 대체하지 않고 , 해당 함수의 호출 여부와 어떻게 호출되었는지를 파악하게 합니다.
예를 들어 , 테스트 코드에서 useParams로 인자를 받아와야 하는 경우가 있습니다. 이때 

```js
...
import Router from 'react-router-dom';
...

jest.spyOn(Router, 'useParams').mockReturnValue({ ... });
```
이런 식으로 선언해주면 , useParams 라는 함수를 호출했다고 판단하고 , mockReturnValue 함수로 특정 값을 리턴하게 해줍니다. 서버가 연결되어 있지 않아도 useParams로 인자를 받아온 것과 같은 역할을 수행합니다.

</br>

## waitForNextUpdate()
비동기 업데이트의 결과로 상태가 업데이트 될 때 , hook 이 렌더링 되어서 생기는 값을 반환합니다. 즉 query가 mocking 이후에 hook이 작동되었을 때 생기는 값을 반환하게 됩니다. 특정 값을 반환한다고 유추할 수도 있고 작동되어서 안에 특정 함수가 불려지는 것을 toBeCalledTimes 등으로 체크할 수도 있습니다. 비동기로 작동되어서 async / await 이 필요합니다.

```js
const { result, waitForNextUpdate } = ... // hook mocking

expect(result.current.id).toBeUndefined();  
// 모킹만 되고 불려지지 않은 상태, id는 undefined
await waitForNextUpdate();
// hook이 렌더링되고 , 생기는 값을 리턴
expect(result.current.id).toBe(REPO_ID);
// id값에 mocking한 hook이 작동되고 특정 값과 같은지 비교하는 단계
```