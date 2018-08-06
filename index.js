const DB = require('./lib/db');
const Ctrl = require('./lib/ctrl');
const _ = require('lodash');
const async = require('async');

/**
 *
 * @param tableName
 * @returns Table
 * @constructor
 */
const BrestSQLite = {};

BrestSQLite.Table = require('./classes/table');
BrestSQLite.Controller = require('./classes/controller');

/**
 * Init extension within Brest
 * @param brest
 * @param callback
 */
BrestSQLite.before_static_init = function(brest, callback) {
   async.waterfall([
     next => {
       BrestSQLite.db = new DB();
       brest.db = BrestSQLite.db;
       BrestSQLite.db.connect(brest, brest.getSetting('sqlite'), next)
     },
     next => {
       BrestSQLite.controllers = new Ctrl();
       BrestSQLite.controllers.init(brest, next)
     }
   ], callback);
};

BrestSQLite.tbl = function(table_name) {
    return BrestSQLite.db.tables[table_name];
};

BrestSQLite.ctrl = function(table_name) {
    return BrestSQLite.controllers.get(table_name);
};

BrestSQLite.CONFLICT_DO_UPDATE = 'do_update';
BrestSQLite.CONFLICT_DO_NOTHING = 'do_nothing';

BrestSQLite.filters = {
    limit: {description: "Limit the request <%count%>,<%from%>", toArray: true},
    order: {description: "Sort by the fields"}
};

module.exports = BrestSQLite;
