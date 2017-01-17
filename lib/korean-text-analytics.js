/**
 * Created by Hyunwoo on 2016. 6. 1..
 */
const _ = require('lodash');
const Iconv = require('iconv').Iconv;
const iconv = new Iconv('utf-8', 'euc-kr');
const iconvlite = require('iconv-lite');
const os = require('os');
const isWindow = os.platform().startsWith('win');

exports.ExecuteMorphModule = ExecuteMorphModule;
exports.ResultOnlyTags = function (ret) {
    let tags = [];
    _.each(ret.contents, function (each) {
        _.each(each.morphed, function (m) {
            _.each(m.tags, function (tag) {
                tags.push(tag);
            });
        })
    });
    return tags;
};
exports.TaskQueue = class TaskQueue {
    constructor() {
        this._tasks = [];
        this._addtion = [];
        this._ret = [];
        this._callback = (err, rep) => {
        };
    };

    addSteamTask(d, addition) {
        d = d.replace(/\./gi, '. ');
        this._tasks.push(d);
        if (addition === undefined) addition = {};
        this._addtion.push(addition);
    };

    exec(callback) {
        this._callback = callback;
        let _current = 0;
        if (this._tasks.length == 0) {
            callback('task not exist', null);
            return;
        }
        let taskText = this._tasks[_current];

        let tasklist = this._tasks;
        let addition = this._addtion;
        let ret = {
            contents: [],
            error: [],
        };

        steam(taskText, executer);

        function executer(success, rep) {
            if (!success) {
                ret.error.push({
                    source: tasklist,
                    err: rep
                });
            }
            var morphed = [];

            function makeStemmedStruct(each) {
                var sen = '';
                var tags = each;
                _.map(each, function (d) {
                    if (d.tag.startsWith('N') ||
                        d.tag.startsWith('V') ||
                        d.tag.startsWith('M') ||
                        d.tag.startsWith('N')) {
                        if (sen.length != 0) sen += ' ';
                    }
                    sen += d.word;
                });
                return {
                    wording: sen,
                    tags: tags
                }
            }

            var each = [];
            _.map(rep.steammed, function (d) {
                if (d[1] == 'SF') {
                    if (each.length != 0) morphed.push(makeStemmedStruct(each));
                    each = [];
                } else if (d[0].indexOf('.') != -1) {
                    each.push({
                        word: d[0],
                        tag: d[1]
                    });
                    if (each.length != 0) morphed.push(makeStemmedStruct(each));
                    each = [];
                } else {
                    each.push({
                        word: d[0],
                        tag: d[1]
                    });
                }
            });
            morphed.push(makeStemmedStruct(each));

            // ret.morphed.push(morphed);
            ret.contents.push({
                source: tasklist[_current],
                addition: addition[_current],
                morphed: morphed
            });

            if (++_current == tasklist.length) {
                callback(null, ret);
                //console.log('test : steam over');
            } else {
                let taskText = tasklist[_current];
                steam(taskText, executer);
            }

        }

        function steam(d, callback) {
            return ExecuteMorphModule(d, callback);
        }
    };
}
;

function ExecuteMorphModule(buf, callback) {
    //callback(false,'error');
    //return;
    try {
        const spawn = require('child_process').spawn;
        const child = spawn('java', ['-jar', 'FoxtailTextAnalytics.jar'], {cwd: __dirname});

        child.stdin.setEncoding('utf-8');
        if (isWindow) buf = iconv.convert(buf);
        child.stdin.write(buf);
        child.stdin.write('\n');
        child.stdin.write('##MORPH\n');

        //console.log('EXEC MODULE ##MORPH');

        var buffer = new Buffer('');
        child.stdout.on('data', function (data) {
            buffer = Buffer.concat([buffer, data])
        });

        child.stderr.on('data', function (data) {
            //console.log(data.toString());
        });

        child.on('close', function (e) {
            if (e == 0) {
                // callback true
                if (isWindow) buffer = iconvlite.decode(buffer, 'euc-kr');
                callback(true, JSON.parse(buffer));
                //console.error(JSON.parse(buff));
            } else {
                // return err
                callback(false, 'module error');
            }
        })
    } catch (e) {
        console.log(e);
        //callback(false, 'module error');
    }

}

exports.ExecuteLDAModule = ExecuteLDAModule;
function ExecuteLDAModule(buf, iteration, topic, word, callback) {
    const spawn = require('child_process').spawn;
    const child = spawn('java', ['-jar', 'FoxtailTextAnalisys.jar'], {cwd: __dirname});

    child.stdin.setEncoding('utf-8');
    if (isWindow) buf = iconv.convert(buf);
    child.stdin.write(buf);
    child.stdin.write('\n');
    var exec = '##LDA ' + iteration + ' ' + topic + ' ' + word + '\n';
    child.stdin.write(exec);
    console.log('EXEC MODULE ##LDA : ' + exec);

    var buffer = new Buffer('');
    child.stdout.on('data', function (data) {
        buffer = Buffer.concat([buffer, data])
    });

    child.stderr.on('data', function (data) {
        //console.log(data.toString());
    });

    child.on('close', function (e) {
        if (e == 0) {
            // callback true
            if (isWindow) buffer = iconvlite.decode(buffer, 'euc-kr');
            callback(true, JSON.parse(buffer));
        } else {
            // return err
            callback(false, 'module error');
        }
    })
}

