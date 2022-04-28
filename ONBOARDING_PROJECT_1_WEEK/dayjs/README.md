# Day JS vs Moment JS

* [공식 문서](https://day.js.org/en/)
* [한국어 번역](https://github.com/iamkun/dayjs/blob/dev/docs/ko/README-ko.md)

코드를 보면서 인사이트를 얻던 도중에 moment.js 를 대체할 라이브러리로 day.js 를 사용한다는 게시글을 보게 되었습니다. 글이 꽤나 흥미있고 논리적이어서 공부하며 정리해 보았습니다.

[참고 자료](https://blog.hoseung.me/2022-03-13-dayjs-instead-of-momentjs/)

</br>

## Moment.js의 서비스 지원 중단
moment.js는 2011년 발표된 이후 약 11년이 지난 오래된 라이브러리입니다. 그래서 오랜 시간 개발에 따라 번들의 크기도 매우 증가했고 , 또 신규 기능을 추가하지 않고 특별한 문제가 발생하지 않는 한 업데이트는 없으며 유지보수만 이루어진다고 공식 발표했습니다. 게다가 공식 문서에서 moment.js 의 대안으로 day.js가 있다고 말하기도 했습니다. 

</br>

## Day.js의 장점


가장 큰 장점이라고 한다면 역시 번들의 크기가 작다는 점이 있습니다. moment.js보다 무려 33배 가볍고 , 또한 문법이 moment.js와 거의 흡사해서 대체재로 많이 사용되고 있습니다. 기본 기능을 넣은 후 나머지는 플러그인으로 확장시키는 방법을 사용해서 사이즈가 매우 작아졌습니다. 

[플러그인 목록](https://day.js.org/docs/en/plugin/plugin)

</br>

## 