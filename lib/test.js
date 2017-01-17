var mod = require('./korean-text-analytics');

taskSingleDocument();
// taskMultipleDocument();
function taskSingleDocument() {
    mod.ExecuteMorphModule('안녕하세요. 여기는 대한민국 입니다.', function (err, rep) {
        console.log(err, rep);
    })
}
function taskMultipleDocument() {
    var task = new mod.TaskQueue();
    task.addSteamTask('동해물과 백두산이 마르고 닳도록', {comment: '추가 정보'});
    task.addSteamTask('하느님이 보우하사 우리나라만세', {comment: '추가 정보'});
    task.exec(function (err, rep) {
        var tags = mod.ResultOnlyTags(rep);
        console.log(JSON.stringify(rep));
        require('fs').writeFileSync('./test.json', JSON.stringify(rep, null, 2));
        console.log(tags);
    });

}
