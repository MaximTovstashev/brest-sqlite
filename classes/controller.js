const _ = require('lodash');

const httpStatus = require('../lib/http_status_codes');

class Controller {

    get name() {
        return this.table.name;
    }

    /**
     *
     * @param {Table} table
     */
    constructor(table) {
        this.table = table;
        this.ctrl = require('../index').controllers;
    }

    /**
     * Default row request
     * @param {Number|String|Object} [filters] Filters object
     * @return {Promise}
     */
    row(filters) {
        return this.table.row(filters);
    }

    /**
     * Default list request
     * @param filters
     * @return {Promise}
     */
    list(filters) {
        return this.table.list(filters);
    }

    /**
     * Default insert request
     * @param {Object} data
     * @param {Object} [filters]
     * @param {Function} callback
     */
    insert(data, filters, callback) {
        return this.table.insert(data, filters);
    }

    /**
     * Default update request
     * @param {Object} data
     * @param {Object} [filters]
     * @return {Promise}
     */
    update(data, filters) {
        return this.table.update(data, filters);
    }

    /**
     * Default delete request
     * @param {Number|Object} filters
     * @return {Promise}
     */
    del(filters) {
        return this.table.del(filters);
    }


    /**
     * Return the number of records matching the request. Count all records by default
     * @param filters
     * @return {Promise}
     */
    count(filters) {
        return this.table.count(filters);
    };

    /**
     * Returns true if query
     *
     * @param filters
     * @return {Promise}
     */
    exists(filters) {
        if (_.isEmpty(filters)) return Promise.reject({error: `Empty request for ${this.name} entry existance check`, code: httpStatus.UNPROCESSABLE_ENTITY});
        return this.table.exists(filters)
          .then(exists => _.defaults(filters, {exists}));
    };

    /**
     * Wrapper for Table::defaultFilters
     * @param {Object} filters
     * @param {String[]} exclude
     * @returns {Object}
     */
    defaultFilters(filters, exclude) {
        return this.table.defaultFilters(filters, exclude);
    }

}

module.exports = Controller;
