# Apollo Client

## **[공식 문서](#https://www.apollographql.com/)**

Apollo Client는 GraphQL 기반의 라이브러리로 , 로컬에서 전역 상태관리를 하기 위해 사용합니다. 원래는 GraphQL을 사용해서 서버와 통신을 하면서 반환한 값을 캐시로 보관하는데 , 일부 서비스는 서버 없이 완전히 독립적으로 작동할 수 있고 (반응 변수) , 그런 경우에도 로컬 상태를 관리할 수 있습니다. 즉 추가적인 상태관리 라이브러리를 사용하지 않고도 충분히 전역 상태관리를 적용할 수 있습니다.

</br>

## 통신 과정 ( 기본 값 : cache-first )

1. apollo client가 쿼리를 통해 로컬 / 원격 필드를 요청하면 , 
2. cache는 요청받은 쿼리를 통해 동일한 쿼리가 캐싱되어 있는지 확인하고
3. 캐싱 되어있지 않다면 서버로 원격 필드를 요청하고
4. 서버는 요청 받은 필드를 확인 후 반환해주고
5. 캐시는 반환 받은 필드를 캐시에 저장하고 클라이언트에게 필드 반환합니다.

만약 3번에서 캐싱 되어있다면 , 서버에 따로 요청하지 않고 바로 반환합니다. 이처럼 Apollo Client는 캐시를 통해서 상태관리를 하고 로컬 상태도 관리할 수 있습니다. 이것에 대한 정책은 fetchPolicy를 통해서 정해집니다.

( 기존 상태 관리인 Redux는  액션이 발생하면 서버에 요청 후 , 응답을 받으면 리듀서에게 전달하고 리듀서는 스토어에 state tree를 업데이트 해서 state를 관리하는 방식이었습니다. 이는 컴포넌트 하나를 렌더링하기 위해서 너무 많은 과정이 필요하고 , 서버와 통신하는 과정에서 여러 endpoint를 인해 복잡도 증가 , overfetching/underfetching의 문제가 존재했습니다. )

</br>

## 반응 변수

Apollo Client 에서 제공하는 **makeVar** 함수를 통해 반응 변수를 만들 수 있는데 , 이 반응 변수는 Apollo Client 캐시 외부에 로컬 상태를 저장합니다. useReactiveVar을 사용해서 캐시에 정의하지 않고 , 쿼리를 작성하지 않아도 직접 반응 변수에서 상태를 가져올 수 있습니다. useReactiveVar를 사용해서 수정 및 업데이트할 수 있습니다.

</br>

## fetchPolicy

GraphQL에서 어려운 캐싱 문제를 해결하는 방법으로 , HTTP 요청을 최적화하고 캐시 데이터 공유를 쉽게 하도록 만들어진 정책입니다.

1. cache-first\
기본값이고 , 위 과정에 적힌 내용처럼 동작합니다. 캐시를 먼저 확인해서 불필요한 요청은 줄여주므로 변경될 여지가 적은 데이터에 사용하는 것이 적절합니다.

2. cache-and-network\
쿼리를 사용할 때 캐시를 확인하고 캐시 데이터가 있다면 일단 반환합니다. 그 이후 서버에 데이터를 요청하고 , 캐시 데이터를 업데이트 한 후 반환합니다. 총 두 번의 반환이 발생하고 , 무조건 HTTP 요청이 일어납니다. 실시간으로 변경이 잦은 데이터의 경우 응답속도를 위해 반환하고 이후 서버에서 데이터를 받아와서 반환합니다.

3. network-only\
이 경우 바로 서버에 데이터를 요청하고 , 캐시를 업데이트 한 후 반환합니다. cache-and-network에서 초기에 만료된 데이터를 보여준다는 단점을 해소할 수 있습니다. 

4. cache-only\
이 경우 서버와의 통신은 일어나지 않고 쿼리를 사용할 때 캐시를 확인 후 데이터가 있으면 반환 , 없으면 에러를 일으킵니다.

5. no-cache\
이 경우 network-only와는 다르게 서버에 데이터를 요청후 바로 반환합니다. 캐시를 업데이트 하는 동작이 사라졌습니다.

</br>

## useQuery , useMutation

</br>

## 질문

1.  addTypename 역할은 무엇인지 ?
    - true일 때 쿼리의 모든 object에 __typename 필드가 자동으로 추가됩니다.(기본값이 true)
2. __typename은 무엇인지 ?
    - 11
3.  useMutation의 순서 , 캐시 변환 후 서버 수정 vs 서버 수정후 캐싱되는지 ?
4.  또한 쿼리 요청시 캐싱되었는지 확인 , 캐싱된 정보와 서버가 다른지 같은지 어떻게 식별하는지 ? 
    - 3번과 4번은 모두 fetch-policy 속성을 따라갑니다. 쿼리를 요청할 때 정해진 fetch-policy로 데이터들을 어떤 방법으로 컨트롤할지를 정하고 따라갑니다.
5.  fetch-policy 속성에서 watchQuery와 Query 속성의 차이 ?
    - Query는 단순히 Read에 해당하며 , 데이터를 가져오기만 한다.\
    하지만 watchQuery는 mutation이 일어날 때 , DB에 업데이트가 일어날 때 자동적으로 query를 날려준다.
6. makeVar로 반응 변수를 만드는 이유 ?
    - 반응 변수는 apollo가 캐시 외부에서 로컬 상태 관리를 하기 위해 만들어지는 변수입니다. 캐시와 분리되기 때문에 모든 유형 및 구조의 데이터를 저장할 수 있을 뿐 아니라 graphQL 구문을 사용하지 않고도 전역에서 이 변수를 사용할 수 있습니다. 