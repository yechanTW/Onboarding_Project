# nanoid
[공식 문서](https://www.npmjs.com/package/nanoid)

고유 문자열 id 생성기 입니다. 기존 uuid보다 2배정도 빠르고 , uuid보다 더 많은 알파벳을 사용해서 길이가 더 짧습니다. ( uuid : 36 , nanoid : 21)

</br>

## uuid

기존에 많이 사용하던 문자열 id 생성기 입니다. v1 ~ v5 까지 5가지 방법이 존재합니다.

</br>

### v1
Timestamp(시간) 을 기반으로 랜덤한 uuid를 생성합니다. 

</br>

### v2
timestamp를 기반으로 uuid를 생성합니다. 다만 특수한 경우에만 사용됩니다.

</br>

### v3
md5 해싱을 기반으로 uuid를 생성합니다. name과 namespace가 필요합니다. v5가 있어서 v3 보다 v5를 사용하는 것을 권장합니다. 

</br>

### v4
완점 랜덤을 기반으로 uuid를 생성합니다.

</br>

### v5
sha-1 해싱을 기반으로 uuid를 생성합니다. name과 namespace가 필요합니다.