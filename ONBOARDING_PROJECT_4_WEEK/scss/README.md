## SASS

Syntactically Awesome Style Sheets 의 줄임말로 , 문법적으로 개쩌는 스타일 시트라는 말이다. css의 작업이 크고 복잡해지는 경우 불편해지는데 , 그 복잡한 css 작업을 쉽게 해주고 가독성과 재사용성을 높이는 도구다.

</br>

## SCSS

SASS CSS 라는 뜻이다. SASS보다 더 CSS와 호환되게 사용 가능하다. 

```html
<ul class='list'>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</div>
```
라는 html이 있다면 , 

```SASS
.list
    width: 100px
    float: left
    li
        color: red
        background: url("./image.jpg")
        &:last-child
            margin-right: -10px
```

SASS 는 들여쓰기의 차이로 구분하는 반면에

```SCSS
.list {
    width: 100px;
    float: left;
    li {
        color: red;
        background: url("./image.jpg");
        &:last-child {
            margin-right: -10px;
        }
    }
}
```

SCSS는 {} 와 ; 을 사용해서 구분한다.

</br>

## Mixin

사실 mixin을 정리하기 위해 쓴 것이나 다름없다. 그동안 css에서 여러가지 중복되는 결과들이 많이 있었는데, 그때마다 복사해서 붙여넣기 하던가 일일히 지정해 주어야했다. 하지만 mixin을 사용하면 마치 리액트에서 컴포넌트를 사용하듯이 특정한 css 를 재사용이 가능하다. mixin 파일에 지정해 두고 , 그때그때 사용하면 된다.

```SCSS
@mixin square($width: 0px, $height: null, $borderRadius: null) {
  width: $width;
  @if $height != null {
    height: $height;
  } @else {
    height: $width;
  }

  @if $borderRadius != null {
    border-radius: $borderRadius;
  }
}
```

기본값을 지정해두고 , 특정값을 이용하면 사용할 수 있다.

```SCSS
@include squere(16px, 16px, 8px);
```

위와 같이 지정하면 지름 16px의 원이 생성되는 것을 알 수 있다.