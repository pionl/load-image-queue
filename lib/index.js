'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.global = exports.createImageQueue = undefined;

var _ImageLoadTask = require('./ImageLoadTask');

var _ImageLoadTask2 = _interopRequireDefault(_ImageLoadTask);

var _loadQueue = require('load-queue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new queue with for image
 *
 * @param {Number} concurrentJobs
 * @param {boolean} cache In default uses cache because mostly image are not changed while runtime
 * @return {Queue|CachedQueue}
 */
function createImageQueue() {
    var concurrentJobs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (cache) {
        return new _loadQueue.CachedQueue(_ImageLoadTask2.default, concurrentJobs);
    }
    return new _loadQueue.Queue(_ImageLoadTask2.default, concurrentJobs);
}

/**
 * Global image queue
 * @type {Queue}
 */
var global = createImageQueue();

exports.createImageQueue = createImageQueue;
exports.global = global;
exports.default = global;