# Jest

Test 관련 도구들을 제공해주는 테스팅 프레임워크입니다. Test Runner , Test Matcher , Test Mock 까지 제공해 줍니다.

## React Testing Library 

기존 구현 위주의 Enzyme를 대신해서 나온 기능 기반의 테스트 도구로 , React 에서 컴포넌트를 테스트하기 위해서 만들어진 도구입니다. 

## @Testing-library/jest-dom

RTL은 요소를 렌더링하는 부분을 다루고 , 실제 Dom의 노드들을 테스트하는 것은 jest 입니다. jest 자체적으로 기능 테스트를 할 수 있지만 , 리액트의 컴포넌트를 렌더링하고 테스트하기 위해서는 RTL의 기능이 필요합니다. 그래서 리액트 내부의 테스트 코드 작성 방식은 jest와 상당 부분 유사합니다.

## MockedProvider

apollo-client를 사용하는 리액트 구성 요소를 테스트 하기 위한 요소로 , 테스트에서 GraphQL 서버와 통신할 필요 없이 개별 쿼리에 대한 mock 응답을 정의해줍니다. 

