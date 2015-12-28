from __future__ import division
import Config
import pytumblr
import sys
import os
import json
from itertools import count

blogName = sys.argv[1]
sanitaryBlogName = blogName.encode('ascii', 'ignore')
outputLocation = 'output/' + sanitaryBlogName + '/'
ownWords = []
processedCount = 0
totalCount = 0

client = pytumblr.TumblrRestClient(Config.consumerKey)
blogData = client.posts(blogName)['blog']
totalCount = blogData['posts']

if not os.path.exists(outputLocation):
    os.makedirs(outputLocation)

print 'Loading metadata for ' + blogName

with open(outputLocation + blogName + '.txt', 'w') as newText:
    newText.write(json.dumps(blogData))

print "Completed " + blogName
