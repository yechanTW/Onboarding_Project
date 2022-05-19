# git Rebase and Merge

## Merge

말 그대로 병합이다. 두 개의 다른 브랜치를 하나로 만드는 과정이다. 협업과정에서 master 브랜치가 있고 , 내 로컬 브랜치가 있는 상황에서 수정사항을 일치시키는 과정이다.

### Fast-Forward merge

서로 다른 상태간의 병합이 아니라 , master의 위치만 변경해도 되는 과정이다. 예를 들어서 , master 브랜치에서 a 브랜치를 만들고 , a 브랜치를 master 브랜치로 병합하는 과정이 있다고 하면 , 단순히 master의 위치를 a로 이동시키기만 하면 해결된다. 위와 같은 과정을 Fast-forward merge 라고 한다.

<img src="https://user-images.githubusercontent.com/103919553/169329203-0933acf1-24a8-48d6-84c5-150ebbf01722.png" width="50%" />

### 3-way merge

서로 다른 상태를 병합하는 과정이다. 두 브랜치의 커밋과 공통으로 빠져나온 root의 커밋 총 3개를 합쳐서 새로운 커밋을 만드는 과정이다. 히스토리 상에도 머지한 기록이 남아있기 때문에 , 브랜치가 많아지는 경우에는 히스토리가 지저분해질 수 있다는 단점이 있다.

<img src="https://user-images.githubusercontent.com/103919553/169332289-b7f2d0bf-129b-41ec-a544-d14163a74b16.png" width="50%" />

3개를 비교하는 이유는 , master과 a만 비교했을 때 특정 파일에서 둘의 커밋이 a와 b 로 다르다고 가정해보면 git은 둘이 다른 것이 충돌이 난 것인지 , 아니면 둘다 각각 다른 내용이라 충돌이 나지 않는지, 충돌이라면 무엇이 달라진 커밋인지 파악하기 어렵다. 그래서 둘이 같이 뻗어나온 root를 이용해서 무엇이 달라졌고 무엇이 충돌이 난 것인지를 파악할 수 있는 것이다.

## Rebase

re : base , 말 그대로 베이스를 새로 정한다는 뜻이다. master 브랜치와 a 브랜치가 rebase 한다면 , master 브랜치로 root를 이동시킨다. 그 이후 , a 커밋을 root에 진행된 것처럼 옮긴 후 master의 위치를 옮기는 것을 의미한다. 이 경우 마치 하나의 뿌리에서 계속 작업한 것처럼 나타내져서 히스토리가 굉장히 깔끔해진다.

<img src="https://user-images.githubusercontent.com/103919553/169335882-a9098ef8-0a75-4e29-8e2e-584eccdc49db.png" width="50%" />

### squash and merge

rebase와 비슷한 방법이지만 , 이 경우는 기존의 커밋을 하나로 모아서 베이스를 이동한 후 커밋하는 방법이다. 마찬가지로 히스토리가 굉장히 깔끔해지지만 , 커밋을 모으는 과정에서 기존 커밋이 날아가고 하나로 합쳐지면서 누가 어떤 파일을 수정했는지는 기록에 남지 않는다는 단점이 있다.

<img src="https://user-images.githubusercontent.com/103919553/169337730-c62bd3c4-29bb-437a-b3d5-b123a22a1b24.png" width="50%" />


