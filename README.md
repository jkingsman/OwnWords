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
./ownwords.js --blog [yourblog.tumblr.com] --key [Tumblr API consumer key]
```

The script will then loop through all pages of Tumblr posts it can find, and log the type, URL, and post date in GMT time to the console.

Near as I can tell, there's no rate limiting in v2 of the Tumblr API; there was heavy limiting in v1 but I've combed blogs with 10K+ posts and they've gone through fine.

## License

Licensed under the MIT License.
