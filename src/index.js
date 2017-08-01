import ImageLoadTask from './ImageLoadTask'
import {Queue, CachedQueue} from 'load-queue'

/**
 * Creates a new queue with for image
 *
 * @param {Number} concurrentJobs
 * @param {boolean} cache In default uses cache because mostly image are not changed while runtime
 * @return {Queue|CachedQueue}
 */
function createImageQueue (concurrentJobs = 1, cache = true, ) {
    if (cache) {
        return new CachedQueue(ImageLoadTask, concurrentJobs)
    }
    return new Queue(ImageLoadTask, concurrentJobs)
}

/**
 * Global image queue
 * @type {Queue}
 */
const global = createImageQueue()

export {
    createImageQueue,
    global
}
export default global
