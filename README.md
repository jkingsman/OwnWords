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

Example Output: 

```
Found original video at http://taylorswift.tumblr.com/post/103190985665/yeah-you-wanna-find-love-then-you-know-where-the (published on 2014-11-21 08:52:08 GMT)
Found original photo at http://taylorswift.tumblr.com/post/103190931335/the-1975-at-the-palladium (published on 2014-11-21 08:50:23 GMT)
Found original text at http://taylorswift.tumblr.com/post/102738967840/stuff-and-things-and-stuff (published on 2014-11-16 01:23:22 GMT)
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
