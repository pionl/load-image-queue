# Load image queue 
Loading image with queue support to allow loading images as you need. Ideal for virtual list (with cancel support).
Uses [load-queue](https://github.com/pionl/load-queue).

You can use the global queue or create your own.

## Install

```
npm install load-image-queue --save
```

### Browser

Library is exported via `UMD`. From `LoadImageQueue` object you can access to default (global object) queue or create new one

```html
<script src="./dist/load-image-queue.js" type="text/javascript"></script>

<script>
// Default global queue
var queue = new LoadQueue.default
// Create custom queue
var queue3 = new LoadQueue.createImageQueue(2)
</script>
```

### Import / Require

#### Default (Queue)
```javascript
import globalQueue from 'load-image-queue'

globalQueue.add(...)
```
#### createImageQueue
```javascript
import {createImageQueue} from 'load-image-queue'

var queue = createImageQueue()
```

## Usage

You can use the global queue (uses cached queue of 1 concurrent job) or create your own custom queue via `createImageQueue`.

`createImageQueue(jobs = 1, cached = true)` accepts number of concurrent jobs (default 1) as first parameters, second parameter defines, if you want
to use [cached queue](https://github.com/pionl/load-queue#load-queue).

To add a new url to load queue, just call `add(url, success, error)`. The add method will return the `QueueEntry` that holds
given url.

```javascript
var entry = queue.add('url', function(url, customVar, customVar2) {
    console.log(url, customVar, customVar2)
}, function(error) {
  console.log(error)
})
console.log(entry.url)

// Or cancel the request
entry.cancel()
```

More about how to cancel and work with queue, check the `load-queue` [package](https://github.com/pionl/load-queue#load-queue)

# React usage
This package is ideal to use with react component (or any virtual dom). It is important to call cancel when component
has been updated (or moved)

```javascript
import {createImageQueue} from 'load-image-queue'

const images = createImageQueue(3)

export default class Image extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired
    }
    static defaultProps = {}

    constructor (props, context) {
        super(props, context)

        /**
         * The queue entry
         * @type {QueueEntry}
         */
        this.queueEntry = null
        this.mounted = false
        this.state = {
            loading: true,
            error: null
        }
    }

    /**
     * Load the image
     */
    loadImage () {
        const {loading, error} = this.state
        if (loading === false || error !== null) {
            return
        }

        // Get the thumbnail
        const {url} = this.props

        // Load the image
        this.queueEntry = images.load(url, (url) => {
            if (this.mounted === false) {
                return
            } 
            
            this.setState({
                loading: false,
                error: null
            })
        }, (error) => {
            this.setState({
                error: error
            })
        })
    }

    /**
     * Cancels current load
     */
    cancelLoad () {
        if (this.queueEntry !== null) {
            this.queueEntry.cancel()
            this.queueEntry = null
        }
    }

    // Load the image when the component has been mounted or updated
    componentWillMount () {
        this.mounted = true
        this.loadImage()
    }

    componentDidUpdate () {
        this.loadImage()
    }

    /**
     * Cancel upload when component is being destroyed
     */
    componentWillUnmount () {
        this.mounted = false
        this.cancelLoad()
    }

    /**
     * Handle new props url and load new image
     * @param nextProps
     */
    componentWillReceiveProps (nextProps) {
        if (nextProps.url !== this.props.url) {
            // Cancel the previously loaded image
            this.cancelLoad()

            // Update the state to loading
            this.setState({
                loading: true,
                error: null
            })
        }
    }

    render () {
        const {loading, error} = this.state
        const {url} = this.props

        // Pass src only if loaded
        let src = null
        if (loading === false && error === null) {
            src = `url(${url})`
        }

        return <img src={src} />
    }
}

```

## Copyright and License

[load-image-queue](https://github.com/pionl/load-image-queue)
was written by [Martin Kluska](http://kluska.cz) and is released under the 
[MIT License](LICENSE.md).

Copyright (c) 2017 Martin Kluska