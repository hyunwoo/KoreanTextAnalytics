/**
 * Created by hyunwoo on 2017-01-16.
 */
/**
 * Created by hyunwoo on 2016-08-18.
 */
var GoogleSpreadsheet = require('google-spreadsheet');
var _ = require('lodash');

module.exports = function (spreadSheetID) {
    return {
        json: function (sheetIndex, func) {
            const doc = new GoogleSpreadsheet(spreadSheetID);
            var datas = [];
            var keyMap = [];
            // get keys
            doc.getCells(sheetIndex, {'min-row': 1, 'max-row': 1}, function (e, r) {
                if (e) {
                    func(e, 'failed to load spreadsheet data');
                    return;
                }
                _.map(r, function (t, i) {
                    keyMap[t.col] = t._value;
                });
                doc.getCells(sheetIndex, {'min-row': 2}, function (e, r) {
                    _.map(r, function (t, i) {
                        if (_.isNil(datas[t.row])) datas[t.row] = {};
                        var data = datas[t.row];

                        data[keyMap[t.col]] = t._numericValue === undefined ? t._value : t._numericValue;
                    });
                    func(null, _.without(datas, null));
                });
            })
        },

        matrix: function (sheetIndex, func) {
            new GoogleSpreadsheet(spreadSheetID).getCells(sheetIndex, function (e, r) {
                if (e) {
                    func(e, 'failed to load spreadsheet data');
                    return;
                }

                var matrix = [];
                _.map(r, function (t, i) {
                    if (_.isNil(matrix[t.row])) matrix[t.row] = [];
                    var row = matrix[t.row];
                    row[t.col] = t._numericValue === undefined ? t._value : t._numericValue;
                });

                func(null, matrix);
            });
        }
    };
};

