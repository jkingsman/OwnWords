from __future__ import division
import Config
import pytumblr
import sys
import pprint
import ast
from itertools import count

ownWords = []
processedCount = 0
totalCount = 0

client = pytumblr.TumblrRestClient(Config.consumerKey)
blogData = client.posts(sys.argv[1])['blog']
totalCount = blogData['posts']

for offset in count(step=20):
    posts = client.posts(sys.argv[1], reblog_info='true', offset=offset)['posts']
    if not posts: # no more posts
        break
    for post in posts:
        if 'reblogged_from_id' not in post:
            ownWords.append(post)

    processedCount += 20
    print str(round((processedCount / totalCount) * 100)) + '% complete'

for post in ownWords:
    print post['post_url']
