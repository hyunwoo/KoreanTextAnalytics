# korean-text-analytics
## test version.


이 모듈은 nodejs에서 한국어에 대한 자연어 처리를 진행하고 텍스트 마이닝의 기본 기능들을 제공하기 위해 개발되어 지고 있습니다.

유의사항 .

- Windows 10과 Mac osX 에서 테스트를 진행하였습니다. 이외의 플랫폼에서는 테스트를 진행하지 않았습니다.
- iconv 모듈에 의존성이 있습니다.
- 형태소 분석과 토픽 모델링(LDA)에 Java Library가 사용되고 있습니다.
- 테스트 버전이라 형태소 분석에 대한 성능을 기대 할 수 없습니다. (추후 수정 예정)


## 1. 형태소 분석

#### Komoran 형태소 분석기를 사용하고 있습니다.
- Komoran : http://www.shineware.co.kr/?page_id=835
- 이외의 형태소 분석기(꼬꼬마, 한나눔 등)에 대해선 추후 추가 할 예정입니다. - 라이센스 확인 필요
##### JAVA 1.7 이상이 설치 되어 있어야 합니다.

#### 1.1 사용예제
##### 1.1.1 단어와 태그 출력
목적 : 여러 텍스트를 한번에 처리하고 추가적인 정보 없이 단어와 품사를 확인
```javascript
var mod = require('./korean-text-analytics');
var task = new mod.TaskQueue();

task.addSteamTask('동해물과 백두산이 마르고 닳도록', {comment: '추가 정보'});
task.addSteamTask('하느님이 보우하사 우리나라만세', {comment: '추가 정보'});
task.exec(function (err, rep) {
    var tags = mod.ResultOnlyTags(rep);
    console.log(tags);
});

// result :
[
	{ word: '동해물과 백두산이', tag: 'NNP' },
    { word: '마르', tag: 'VV' },
    { word: '고', tag: 'EC' },
    { word: '닳', tag: 'VV' },
    { word: '도록', tag: 'EC' },
    { word: '하느님', tag: 'NNG' },
    { word: '이', tag: 'JKS' },
    { word: '보우', tag: 'NNG' },
    { word: '하', tag: 'XSV' },
    { word: '사', tag: 'EC' },
    { word: '우리나라', tag: 'NNG' },
    { word: '만세', tag: 'NNG' }
]

```


##### 1.1.2 전체 형태소 분석 결과 출력
목적 : 여러 텍스트를 한번에 처리하고 원문과 추가적인 정보를 저장한 상태로 형태소 분석의 결과를 얻고자 함.
```javascript
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

task.addSteamTask('동해물과 백두산이 마르고 닳도록');
task.addSteamTask('하느님이 보우하사 우리나라만세', {comment: '추가 정보'}/*데이터에 대한 추가정보를 입력*/);
task.exec(function (err, rep) {
    console.log(err, JSON.stringify(rep, null, 4));
});

// 결과
result :{
    contents : [
        {
            source : 입력된 문단
            addition : 추가 정보/*입력한 추가 정보가 출력*/
            morphed : [
                {
                    wording : 입력된 문장 ...
                    tags : [
                        {
                            "word":단어,
                            "tag":품사
                        }
                        ...
                    ]
                },
                {
                    ...
                }

            ]
        }
        ...
    ]
}
```


#### 1.2 사용자 사전 추가
```
문서 작성중
```
#### 1.3 품사의 빈도 카운트
```
문서 작성중
```

### 2.0 문서의 단어간 연관성 추출
```
문서 작성중
```

### 3.0 Topic Modeling (LDA)
```
문서 작성중
```


<i>License : Apache License 2.0</i>