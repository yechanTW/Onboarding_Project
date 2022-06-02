# Cumulative Layout Shift ( 누적 레이아웃 이동 )

### [Cumulative Layout Shift](https://web.dev/i18n/ko/cls/)

페이지 콘텐츠의 예기치 못한 이동으로 사용자의 경험이 다르게 발생할 때 , 이러한 일이 발생하는 빈도를 측정하는 가장 큰 레이아웃 이동 점수를 뜻한다. 일반적으로 리소스가 비동기적으로 로드되거나 DOM 요소가 기존 콘텐츠 위에 페이지에 동적으로 추가되기 때문에 발생한다.

<img src="https://miro.medium.com/max/1200/1*iVHCJ-URstRvnVtjkPOWmQ.gif" />
( 위와 같은 경우가 발생하기도 한다 .. )

## 좋은 CLS 점수

우수한 사용자 경험을 제공하려면 사이트의 CLS 점수가 0.1 이하여야 좋은 사용자 경험이고 좋은 CLS 점수라고 한다. 

![image](https://user-images.githubusercontent.com/103919553/171110872-17f7415c-f138-4322-a3b7-baf33baed8d1.png)
 
( 임계값이 75인 이유는 [Core Web Vitals 임계값](https://web.dev/defining-core-web-vitals-thresholds/) 참고 )

## 레이아웃 이동 정보

레이아웃 이동은 Layout Instability API 가 정하는 것으로 , 가시적인 요소의 시작 위치가 변경될 때마다 ( 상단 / 왼쪽 위치 ) layout-shift 항목을 보고하고 , 불안정 요소로 인식한다.
시작 위치가 변경될 때만 발생하고 , 새 요소가 추가되거나 기존 요소의 크기가 변경되어도 다른 가시적 요소의 시작위치가 변경되지 않으면 레이아웃 이동으로 간주하지 않는다.

## 레이아웃 이동 정보

렌더링된 두 개의 프레임 사이 뷰포트의 크기와 뷰포트 내 불안정 요소의 움직임을 인식해서 , impact fraction(영향분율) 과 distance fraction(거리분율) 을 측정값으로 산출해 계산한다.

```layout shift score = impact fraction * distance fraction```

## 영향분율

불안정한 요소가 두 프레임 사이 뷰포트 영역에 미치는 영향을 측정한 값.

![image](https://user-images.githubusercontent.com/103919553/171112127-83245ddd-97a4-423c-a9e5-60090c975e85.png)

50%를 차지하는 요소 ( 회색 요소 ) 가 25% 만큼 아래로 이동한다면 , 빨간 점선은 두 프레임 모두에서 요소의 가시 영역을 합한 것이고 , 이 경우 영향분율은 75%인 0.75 이다.

## 거리분율

뷰포트를 기준으로 불안정 요소가 이동한 거리를 측정한다. 이때 수평 또는 수직으로 이동한 최대 거리를 뷰포트의 가장 큰 치수 ( 너비 또는 높이 ) 로 나눈 값이다.

![image](https://user-images.githubusercontent.com/103919553/171113392-2e85bb17-a2d2-4997-bb7e-0905de63063e.png)

위 경우 가장 큰 뷰포트 치수는 높이 , 이동한 거리는 25%만큼이므로 거리분율은 0.25가 된다.

영향분율은 0.75 , 거리분율은 0.25 이므로 레이아웃 이동 점수는 0.1875 이다.

## 예상한 레이아웃 이동

하지만 모든 레이아웃 이동이 나쁜 건 아니다. 예를 들어서 사용자가 예상할 수 있는 상호 작용 ( 버튼 클릭 , 입력 등 ) 의 경우는 레이아웃 이동이 발생하지만 사용자가 예상했으므로 나쁜 레이아웃 이동이 아니다. 그래서 사용자 입력 후 500 밀리초 이내에 발생하는 레이아웃 이동에는 계산에서 제외되고 , 입력을 감지합니다.

![image](https://user-images.githubusercontent.com/103919553/171124479-cba55dad-9b6c-4847-90af-bfbe3565f272.png)
![image](https://user-images.githubusercontent.com/103919553/171124522-668a73df-06af-49ae-ac9c-d4b4e0200efa.png)

TARAS-Web 에서 사이드바를 클릭하면 버튼 등 안에 있는 컴포넌트들의 레이아웃의 이동이 발생하게 된다. 하지만 
![image](https://user-images.githubusercontent.com/103919553/171124713-99318f54-fd3f-4732-92a3-7659ffd15b45.png)

최근 입력 있음 : 예 로 인식하게 된다.

## 개선 방법

1. 이미지의 명시적인 크기 정의
* 이미지가 렌더링될 때 , 크기를 모르기 때문에 이미지가 렌더링 되면서 크기에 따라서 레이아웃이 변경되는 경우가 생깁니다. 이 때를 대비해서 미리 이미지의 크기를 정해두면 렌더링되면서 공간을 미리 차지합니다.

2. 애니메이션 전환 - transform 사용
* height / width 속성을 이용하는 것이 아닌 transform: scale 속성을 이용해서 애니메이션을 적용한다. 이동시에도 transform: translate()를 사용한다.

## TARAS-Web workspace issue

원인 : workspace hover 시에 문제가 발생한다. 회원 / 로봇으로 표현되던 창이 관리하기로 바뀌면서 생기는 현상이다.
![image](https://user-images.githubusercontent.com/103919553/171123110-4d5fb69a-17a9-4804-a78d-3de0194b6564.png)

이 창이

![image](https://user-images.githubusercontent.com/103919553/171123174-99d5b1af-f93e-40d5-90a7-01e9ea8293df.png)

위와 같이 변경되면서 레이아웃의 시작점( 상단 / 좌측 )이 바뀌게 된다. 

![image](https://user-images.githubusercontent.com/103919553/171128914-9f96ee8a-1805-44cb-b149-5e325a8965ea.png)

## 해결 시도

1. visibility : none;
* 현재는 hover 시에 div 태그 자체를 변경해주고 있어서 , 모두 선언해두고 visibility 를 변경하는 방식으로 진행했지만 역시 같은 issue가 발생했다.

2. display : none
* display 역시 같은 issue가 발생했다.

3. 다만 위 경우 모두 성능 탭에서는 뜨지만 , LightHouse 검사시에는 CLS가 0.001 로 측정됨.
![image](https://user-images.githubusercontent.com/103919553/171559452-e91d9d31-171f-4593-b276-a29dccf8bf51.png)

- 0.1 이하에서는 개선할 것이 없다고 함.
- ![image](https://user-images.githubusercontent.com/103919553/171559818-6a174e8c-f973-46d7-9c31-0feaffa23415.png)
- [참고글](https://gtmetrix.com/cumulative-layout-shift.html)
