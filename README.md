OwnWords
========

A command line utility to find Tumblr posts created by the blog owner (not reblogs).

```bash
./ownwords.js --blog [yourblog.tumblr.com] --key [Tumblr API consumer key]
```

## Installation
The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

Clone this repository:

```bash
git clone https://github.com/jkingsman/OwnWords.git
```

Move into the directory:

```bash
cd OwnWords
```

Install the necessary dependencies:

```bash
npm install
```

## Usage

```bash
./ownwords.js <--blog yourblog.tumblr.com> <--key tumblr_api_consumer_key> [--html] [--type post_type]
```

Example Usage: 

```
./ownwords.js --blog taylorswift.tumblr.com --key cViDRYBtsIuFTv5VFzpvjERsFXcWqkov1dv0P12CDAdWzvBr04 --type video
taylorswift.tumblr.com has 481 posts to process (24 pages)
Found original video at http://taylorswift.tumblr.com/post/103959729000/it-feels-like-one-of-those-nights (published on 2014-11-30 06:49:56 GMT)
Found original video at http://taylorswift.tumblr.com/post/103737170800/austin-playing-with-drones-in-the-house-is-not-a (published on 2014-11-27 18:18:08 GMT)
Found original video at http://taylorswift.tumblr.com/post/103644469300/this-was-what-happened-when-lena-and-i-found-out (published on 2014-11-26 16:35:33 GMT)
[...]
```

Note that due to the nature of the many async API requests in this, date order won't necessarily be present.

## Flags

`--blog` needn't be a `*.tumblr.com` URL; any tumblr blog URL works (i.e. custom blogs that use tumblr for the backend) -- as long as the Tumblr API is happy to process requests for the URL, you're fine.

`--key` is the Tumblr API consumer key - these are unauthenticated queries to the API. Register to get an API key/token/etc [here](https://www.tumblr.com/oauth/apps).

`--html` is an optional flag that will output html links instead of simple text (e.g. if you want to paste the results into an HTML sandbox so you can easily click the links instead of copying and pasting from your CLI window). Also adds `<br />` at the end of each line.

`--type` is an optional flag that will restrict returned posts to a certain type. Supported types are:
* text
* photo
* quote
* link
* chat
* audio
* video
* answer
* queue

Near as I can tell, there's no rate limiting in v2 of the Tumblr API; there was heavy limiting in v1 but I've combed blogs with 10K+ posts and they've gone through fine.

## License

Licensed under the MIT License.
