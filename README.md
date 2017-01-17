# korean-text-analytics
## test version.


�� ����� nodejs���� �ѱ�� ���� �ڿ��� ó���� �����ϰ� �ؽ�Ʈ ���̴��� �⺻ ��ɵ��� �����ϱ� ���� ���ߵǾ� ���� �ֽ��ϴ�.

���ǻ��� .

- Windows 10�� Mac osX ���� �׽�Ʈ�� �����Ͽ����ϴ�. �̿��� �÷��������� �׽�Ʈ�� �������� �ʾҽ��ϴ�.
- iconv ��⿡ �������� �ֽ��ϴ�.
- ���¼� �м��� ���� �𵨸�(LDA)�� Java Library�� ���ǰ� �ֽ��ϴ�.
- �׽�Ʈ �����̶� ���¼� �м��� ���� ������ ��� �� �� �����ϴ�. (���� ���� ����)


## 1. ���¼� �м�

#### Komoran ���¼� �м��⸦ ����ϰ� �ֽ��ϴ�.
- Komoran : http://www.shineware.co.kr/?page_id=835
- �̿��� ���¼� �м���(������, �ѳ��� ��)�� ���ؼ� ���� �߰� �� �����Դϴ�. - ���̼��� Ȯ�� �ʿ�
##### JAVA 1.7 �̻��� ��ġ �Ǿ� �־�� �մϴ�.

#### 1.1 ��뿹��
##### 1.1.1 �� ���� ���¼� �м�
```javascript
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

mod.ExecuteMorphModule('�ȳ��ϼ���. ����� ���� �Դϴ�.', function (err, rep) {
	console.log(err, rep);
})

/* ��� :
rep : {
	morphed: [
     { word: '�ȳ��ϼ���', tag: 'NNP' },
     { word: '.', tag: 'SF' },
     { word: '����', tag: 'NP' },
     { word: '��', tag: 'JX' },
     { word: '���ѹα�', tag: 'NNP' },
     { word: '��', tag: 'VCP' },
     { word: '���ϴ�', tag: 'EF' },
     { word: '.', tag: 'SF' }
    ],
 	origin: '�ȳ��ϼ���. ����� ���ѹα� �Դϴ�. '
}
*/
```
##### 1.1.1 ���� ���忡 ���� �ܾ�� �±� ���
���� : ���� �ؽ�Ʈ�� �ѹ��� ó���ϰ� �߰����� ���� ���� �ܾ�� ǰ�縦 Ȯ��
```javascript
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

task.addSteamTask('���ع��� ��λ��� ������ �⵵��', {comment: '�߰� ����'});
task.addSteamTask('�ϴ����� �����ϻ� �츮���󸸼�', {comment: '�߰� ����'});
task.exec(function (err, rep) {
    var tags = mod.ResultOnlyTags(rep);
    console.log(tags);
});

/* ���
rep : [
	{ word: '���ع��� ��λ���', tag: 'NNP' },
    { word: '����', tag: 'VV' },
    { word: '��', tag: 'EC' },
    { word: '��', tag: 'VV' },
    { word: '����', tag: 'EC' },
    { word: '�ϴ���', tag: 'NNG' },
    { word: '��', tag: 'JKS' },
    { word: '����', tag: 'NNG' },
    { word: '��', tag: 'XSV' },
    { word: '��', tag: 'EC' },
    { word: '�츮����', tag: 'NNG' },
    { word: '����', tag: 'NNG' }
]
*/
```


##### 1.1.2 ��ü ���¼� �м� ��� ���
���� : ���� �ؽ�Ʈ�� �ѹ��� ó���ϰ� ������ �߰����� ������ ������ ���·� ���¼� �м��� ����� ����� ��.
```javascript
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();

task.addSteamTask('���ع��� ��λ��� ������ �⵵��');
task.addSteamTask('�ϴ����� �����ϻ� �츮���󸸼�', {comment: '�߰� ����'}/*�����Ϳ� ���� �߰������� �Է�*/);
task.exec(function (err, rep) {
    console.log(err, JSON.stringify(rep, null, 4));
});

/* ���
rep : JSON ARRAY
[
    {
        "source": "���ع��� ��λ��� ������ �⵵��",
        "addition": {
            "comment": "�߰� ����"
        },
        "morphed": [
            {
                "sentence": "���ع��� ��λ��� ������ �⵵��",
                "words": [
                    {
                        "word": "���ع��� ��λ���",
                        "tag": "NNP"
                    },
                    {
                        "word": "����",
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


#### 1.2 ����� ���� �߰�
```
NodeJS Wrapper ������
```
#### 1.3 ǰ���� �� ī��Ʈ
```
���� �ۼ���
```

### 2.0 ������ �ܾ ������ ����
```
NodeJS Wrapper ������
```

### 3.0 Topic Modeling (LDA)
```
���� �ۼ���
```



contact : h.hyunwoo@gmail.com
- �� ����� �ʱ� ���� �ܰ�� ������ ���� �����ϴ�.
- ������ ���� �����̳� ���ǿ� ���Ͽ� ���� �ֽø� ����� �����ϰڽ��ϴ�.



<i>License : Apache License 2.0</i>


##
### TASK.
- [x] ���¼� �м��� ���� ����
- [x] LDA Javascript Wrapper Testing..
- [x] ����� ���� �߰� Javscript Wrapper ����
- [o] Add Simple Morph Wrapper.
- [o] Morph Result Reformat