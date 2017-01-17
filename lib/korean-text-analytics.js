/**
 * Created by Hyunwoo on 2016. 6. 1..
 */
const _ = require('lodash');
const Iconv = require('iconv').Iconv;
const iconv = new Iconv('utf-8', 'euc-kr');
const iconvlite = require('iconv-lite');
const os = require('os');
const isWindow = os.platform().startsWith('win');
const __morphModule = 'FoxtailTextAnalytics.jar';

exports.ExecuteMorphModule = ExecuteMorphModule;
exports.ResultOnlyTags = function (ret) {
    let tags = [];
    if (_.isNil(ret)) return null;
    _.each(ret, function (each) {
        _.each(each.morphed, function (m) {
            _.each(m.words, function (tag) {
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
        console.log('morph task size : ', this._tasks.length);
        if (this._tasks.length == 0) {
            callback('task not exist', null);
            return;
        }
        let taskText = this._tasks[_current];

        let tasklist = this._tasks;
        let addition = this._addtion;
        let ret = [];

        steam(taskText, executer);

        function executer(err, rep) {
            if (err) {
                ret.push({error: 'module exec error'});
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
                    sentence: sen,
                    words: tags
                }
            }

            var each = [];
            _.map(rep.morphed, function (d) {
                if (d.tag == 'SF') {
                    if (each.length != 0) morphed.push(makeStemmedStruct(each));
                    each = [];
                } else if (d.word.indexOf('.') != -1) {
                    each.push({
                        word: d.word,
                        tag: d.tag
                    });
                    if (each.length != 0) morphed.push(makeStemmedStruct(each));
                    each = [];
                } else {
                    each.push({
                        word: d.word,
                        tag: d.tag
                    });
                }
            });
            morphed.push(makeStemmedStruct(each));

            // ret.morphed.push(morphed);
            ret.push({
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
    try {
        const spawn = require('child_process').spawn;
        const child = spawn('java', ['-jar', __morphModule], {cwd: __dirname});

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
                let d = JSON.parse(buffer);
                let morphed = _.map(d.steammed, function (d) {
                    return {
                        word: d[0],
                        tag: d[1],
                    }
                })
                let ret = {
                    morphed: morphed,
                    origin: d.origin,
                };
                callback(null, ret);
            } else {
                callback('module error', null);
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
    const child = spawn('java', ['-jar', __morphModule], {cwd: __dirname});

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
            var d = JSON.parse(buffer);
            callback(null, d);
        } else {
            // return err
            callback('module error');
        }
    })
}

