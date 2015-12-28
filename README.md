# Using OwnWords Downloader
* Go get an API key here: https://www.tumblr.com/oauth/register
* Stick your consumer key into the config file
* Install things (`pip install -r requirements.txt`)
* Run it (`python OwnWords.py yourblogname`)

If you're a super creeper, you can batch things from a text file (one blog name per line):

```
while read in; do python OwnWords.py "$in"; done < listofnames.txt
```

or you can slay your bandwidth and run it all in parallel by replacing the semicolon before `done` with an ampersand.
