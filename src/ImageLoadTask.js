/**
 * Loads the given entry queue
 *
 * @param {QueueEntry} entry
 * @param {function} success
 * @param {function} error
 * @constructor
 */
export default function ImageLoadTask (entry, success, error) {
    const image = new Image()
    image.onload = () => {
        success()
    }
    image.onerror = () => {
        error(new Error('Image not found'))
    }
    image.src = entry.url
}
