#!/usr/bin/env node

/*jslint node: true, plusplus: true*/
"use strict";

//package declarations
var program =   require('commander');
var assert =    require('assert');
var tumblr =    require('tumblr.js');

//command line options
program
    .option('--blog <url>',     'Blog url (no protocol) e.g. yourblog.tumblr.com)')
    .option('--key <key>',      'Your Tumblr API consumer key')
    .parse(process.argv);
    
//sanity check command line input
assert.ok(program.blog, "Please specify a blogname");
assert.ok(program.key, "Consumer key is required");

//build our client
var client = tumblr.createClient({ consumer_key: program.key });
var pageCount; //number of results pages to go through
var processedPosts = 0;
var originalPosts = 0;

//first, get our total count of posts to go through
client.blogInfo(program.blog, function (err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    
    pageCount = Math.floor(data.blog.posts/20);
    console.log(program.blog + " has " +  data.blog.posts + " posts to process (" + pageCount + " pages)");
    
    for (var currPage = 0; currPage <= pageCount; currPage++) {
        client.posts(program.blog, { limit: 20, offset: (currPage * 20), reblog_info: true }, function (err, data) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            data.posts.forEach(function (post) {
                if(!post.hasOwnProperty('reblogged_from_id')){
                    //post doesn't have the reblogged fields; it's an original post
                    console.log("Found original " + post.type + " at " + post.post_url + " (published on " + post.date + ")");
                    originalPosts++;
                }
                processedPosts++;
            })                
        });
    }
});

