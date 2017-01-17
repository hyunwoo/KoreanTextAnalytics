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
##### 1.1.1 한 문장 형태소 분석
```javascript
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

mod.ExecuteMorphModule('안녕하세요. 여기는 대한민국 입니다.', function (err, rep) {
	console.log(err, rep);
})

/* 결과 :
rep : {
	morphed: [
     { word: '안녕하세요', tag: 'NNP' },
     { word: '.', tag: 'SF' },
     { word: '여기', tag: 'NP' },
     { word: '는', tag: 'JX' },
     { word: '대한민국', tag: 'NNP' },
     { word: '이', tag: 'VCP' },
     { word: 'ㅂ니다', tag: 'EF' },
     { word: '.', tag: 'SF' }
    ],
 	origin: '안녕하세요. 여기는 대한민국 입니다. '
}
*/
```
##### 1.1.1 여러 문장에 대한 단어와 태그 출력
목적 : 여러 텍스트를 한번에 처리하고 추가적인 정보 없이 단어와 품사를 확인
```javascript
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

task.addSteamTask('동해물과 백두산이 마르고 닳도록', {comment: '추가 정보'});
task.addSteamTask('하느님이 보우하사 우리나라만세', {comment: '추가 정보'});
task.exec(function (err, rep) {
    var tags = mod.ResultOnlyTags(rep);
    console.log(tags);
});

/* 결과
rep : [
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
*/
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

/* 결과
rep : JSON ARRAY
[
    {
        "source": "동해물과 백두산이 마르고 닳도록",
        "addition": {
            "comment": "추가 정보"
        },
        "morphed": [
            {
                "sentence": "동해물과 백두산이 마르고 닳도록",
                "words": [
                    {
                        "word": "동해물과 백두산이",
                        "tag": "NNP"
                    },
                    {
                        "word": "마르",
                        "tag": "VV"
                    },
                    ...
                ]
            }
        ]
    },
    ....
]
*/
```


#### 1.2 사용자 사전 추가
```
NodeJS Wrapper 제작중
```
#### 1.3 품사의 빈도 카운트
```
문서 작성중
```

### 2.0 문서의 단어간 연관성 추출
```
NodeJS Wrapper 제작중
```

### 3.0 Topic Modeling (LDA)
```
문서 작성중
```



contact : h.hyunwoo@gmail.com
- 본 모듈은 초기 개발 단계라 미흡한 점이 많습니다.
- 에러에 대한 내용이나 건의에 대하여 메일 주시면 대단히 감사하겠습니다.
- 간단한 테스트 소스는 node_modules/korean-text-analytics/test.js 를 참고하세요


<i>License : Apache License 2.0</i>


##
### TASK.
- [x] 형태소 분석기 성능 개선
- [x] LDA Javascript Wrapper Testing..
- [x] 사용자 사전 추가 Javscript Wrapper 제작
- [o] Add Simple Morph Wrapper.
- [o] Morph Result Reformat