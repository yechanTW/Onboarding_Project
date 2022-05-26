# overflow

가로 스크롤 제거 [[RPD-3142]](https://github.com/twinnylab/taras-web/pull/225) PR 이후 공부한 부분을 정리했습니다.

[참고 문서](https://developer.mozilla.org/ko/docs/Web/CSS/overflow)

## overflow 란 ?

요소의 콘텐츠가 너무 커서 블록의 서식을 벗어날 때 처리법을 말합니다. x축과 y축이 존재합니다.

### overflow : visible

기본으로 전해진 값이며 , 콘텐츠를 자르지 않고 쭉 이어서 표현합니다. 그려야하는 여백 밖에도 그릴 수 있습니다.
![image](https://user-images.githubusercontent.com/103919553/170483657-b6da75db-eb9f-48f9-9d99-f5e029fc5c5b.png)

</br>

### overflow : hidden

콘텐츠를 그려야하는 공간 안에 맞춰서 잘라냅니다. 스크롤바가 따로 제공되지 않습니다. 화면에는 보이지 않는 부분이 코드를 이용해서 스크롤이 가능합니다.
![image](https://user-images.githubusercontent.com/103919553/170483857-36b4aa13-1e8d-4729-896f-ba4520615c3f.png)

</br>

### overflow : clip

hidden과 같이 동작하지만 , 코드를 이용해도 스크롤이 불가능합니다. 

</br>

### overflow : scroll

콘텐츠를 그려야하는 공간에 맞춰서 잘라내고 , 잘라냈는지 안 잘라냈는지 상관없이 무조건 스크롤을 보여줍니다.
![image](https://user-images.githubusercontent.com/103919553/170484181-53f4c359-0a7e-427d-b1ca-b4ce88bfb6f2.png)

</br>

### overflow : auto

브라우저가 결정합니다. 콘텐츠가 그려야하는 공간 여백 안에 들어가면 visible과 똑같이 보입니다. 
![image](https://user-images.githubusercontent.com/103919553/170484390-7498bd47-3745-43e7-b40b-7f9f5b9e5b78.png)

</br>

### overflow : overlay

auto와 동일하게 동작하지만 , 스크롤바가 공간을 차지하지 않고 콘텐츠 위에 생깁니다. 이 부분 때문에 TARAS-Web에 가로 스크롤바가 생기는 이유였습니다. 세로로 긴 콘텐츠가 생기는 경우 , 스크롤바가 생기면서 100% + a 의 길이를 가지게 되어 가로 스크롤이 생기게 되었습니다. 이때 , overflow : overlay를 사용하게 되면 스크롤바가 100%안에 생기게 되므로 가로 스크롤바가 생기지 않습니다. 위 속성은 safari , chrome , opera 등 webkit과 blink 기반 브라우저만 지원합니다.

</br>

### overflow : inherit

visible과 같지만 전역값이면서 , 부모의 요소 속성값을 상속받습니다.

</br>

### overflow : initial

전역값으로 기본값으로 설정합니다. 부모의 요소 속성값을 상속받습니다.

</br>

### overflow : unset

부모의 요소 속성값을 상속받습니다. 상속값이 없다면 초깃값을 사용합니다. 전자일 때는 inherit , 후자일 때는 initial 처럼 작동합니다. 

