from __future__ import division
import Config
import pytumblr
import sys
import os
import pprint
import ast
import re
import urllib
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

for offset in count(step=20):
    posts = client.posts(sys.argv[1], reblog_info='true', offset=offset)['posts']
    if not posts: # no more posts
        break
    for post in posts:
        if 'reblogged_from_id' not in post:
            postType = post['type']

            if postType == 'text':
                with open(outputLocation + post['date'] + '--' + post['title'].encode('ascii', 'ignore') + '.txt', 'w') as newText:
                    newText.write(post['body'].encode('ascii', 'ignore'))
            elif postType == 'photo':
                for i, photo in enumerate(post['photos']):
                    urllib.urlretrieve(photo['alt_sizes'][0]['url'], outputLocation + post['date'] + '--' + re.sub(r'\W+', '', post['caption']) + '--' + re.sub(r'\W+', '', photo['caption']) + str(i) + '.jpg')
            elif postType == 'quote':
                with open(outputLocation + post['date'] + '--' + post['source'].encode('ascii', 'ignore') + '.txt', 'w') as newText:
                    newText.write(post['text'].encode('ascii', 'ignore'))
            elif postType == 'chat':
                with open(outputLocation + post['date'] + '--' + post['title'].encode('ascii', 'ignore') + '.txt', 'w') as newText:
                    newText.write(post['body'].encode('ascii', 'ignore'))
            elif postType == 'video':
                with open(outputLocation + post['date'] + '--' + post['caption'].encode('ascii', 'ignore') + '.txt', 'w') as newText:
                    newText.write(post['post_url'])
            elif postType == 'answer':
                with open(outputLocation + post['date'] + '--QUESTION.txt', 'w') as newText:
                    newText.write(post['question'].encode('ascii', 'ignore') + '\n\n\n' + post['answer'].encode('ascii', 'ignore'))

    processedCount += 20
    print str(round((processedCount / totalCount) * 100)) + '% complete'
