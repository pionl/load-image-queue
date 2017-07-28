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

## Copyright and License

[load-image-queue](https://github.com/pionl/load-image-queue)
was written by [Martin Kluska](http://kluska.cz) and is released under the 
[MIT License](LICENSE.md).

Copyright (c) 2017 Martin Kluska