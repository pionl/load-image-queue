'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ImageLoadTask;
/**
 * Loads the given entry queue
 *
 * @param {QueueEntry} entry
 * @param {function} success
 * @param {function} error
 * @constructor
 */
function ImageLoadTask(entry, success, error) {
    var image = new Image();
    image.onload = function () {
        success();
    };
    image.onerror = function () {
        error(new Error('Image not found'));
    };
    image.src = entry.url;
}