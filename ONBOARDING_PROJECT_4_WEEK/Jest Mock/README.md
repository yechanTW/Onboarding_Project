# Jest Mocking

jest에서 mocking하는 방법에는 여러 방법이 있는데,  

1. jest.fn()
2. jest.spyOn()
3. jest.mock()

이 있다. 이중 1번과 2번을 이용하면 함수 하나하나를 mocking 할 수 있다. 하지만 여러 함수가 한 모듈안에 있으면 일일히 모킹하기 귀찮아진다.

예를들어 , test.js 가 이렇게 정의되어 있다면
```js
...
const a = () => ..
const b = () => ..
const c = () => ..
const d = () => ..
...
```

test를 하기 위해서는 4개를 일일히 모킹 해줘야 한다.
```js
const a = jest.fn()
const b = jest.fn()
const c = jest.fn()
const d = jest.fn()
```

4개도 이정도인데 , 그 개수가 더 많아지면 더욱 힘들어진다. 그 때 사용할 수 있는게 .mock 함수다.

</br>

## jest.mock

test 파일에서 한번에 mocking이 가능하다.
```js
import test from './test.js'

jest.mock('./test.js');
...
```

이런식으로 모듈 자체를 mocking하게 되면 모듈 내의 모든 함수를 자동으로 mocking한다.

</br>

## requireActual

모듈에 대한 모든 검사를 무시하고 실제 모듈을 반환해 준다.

```js
jest.mock('./authAPI', () => ({
  ...jest.requireActual('./authAPI'),
  getTokenFromServer: jest.fn(),
}));
```

위와 같이 mocking 하게 되면 , getTokenFromServer 함수는 실제 reponse 객체를 가져오게 된다.

질문 : 가짜 객체를 가져오게 되면 왜 오류가 발생하는가 ? 가짜를 리턴하는 경우에 오류가 발생하는 이유 ..

</br>

## mockImplementation

mocking 함수의 리턴값 지정 뿐만 아니라 기본 구현까지 변경해줍니다. 

```js
 jest.spyOn(authUtil, 'isAuth').mockImplementation(() => REFRESH_TOKEN);
```

isAuth 함수가 실행되어서 REFRESH_TOKEN이 반환되게 설정했다.

</br>

## mockResolvedvalue

비동기 테스트시 mockReturnValue 대신 사용됩니다. 

```js
jest.fn().mockImplementation(() => Promise.resolve(value));
```

mocking하는 함수가 promise를 반환하는 함수라면 , 이런식으로 사용할 수도 있지만

```js
const asyncMock = jest.fn().mockResolvedValue('answer');

await asyncMock(); // 'answer'
```

이런식으로 사용가능합니다.

</br>

## mockRejectedValue
비동기 함수에서 항상 거부(에러)하는 메소드입니다. 실제로 에러를 발생시킬때, 

```js
const error = new Error(errorMessage);

jest.fn().mockResolvedValue(error);
```

를 사용하게 되면 비동기 함수를 리턴하면서 error를 발생시킬 줄 알았는데 , 그 뒤에 에러가 발생하는 경우 비동기가 실행되는 동안 뒤에서 에러가 발생했습니다. 그래서 변경한 구문이

```js
const error = new Error(errorMessage);

jest.fn().mockRejectedValue(error);
```

입니다. 강제로 거부하게 하고 , 에러를 담아서 발생시키니 원하는 위치에서 에러가 발생합니다.

</br>