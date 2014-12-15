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
    .option('--type <type>',    'Restrict output to the given type (text, photo, quote, link, chat, audio, video, answer, queue')
    .option('--html',           'Output links as HTML links')
    .option('--json',           'Outputs all posts in JSON format. Overrides --html.')
    .parse(process.argv);
    
//sanity check command line input
assert.ok(program.blog, "Please specify a blogname");
assert.ok(program.key, "Consumer key is required");

var allTypes = typeof program.type === 'undefined' ? true : false; //allTypes is true if they haven't specified a type
var pageCount;              //number of results pages to go through
var jsonReturn = [];        //the object we're going to be returning if they want JSON
var textReturn = "";             //string we're going ot be returning if they want text
var numRunningQueries = 0;  //keep trak of how many API calls we have going

//build our API client
var client = tumblr.createClient({ consumer_key: program.key });


//first, get our total count of posts to go through
client.blogInfo(program.blog, function (err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    
    pageCount = Math.floor(data.blog.posts/20);
    console.log(program.blog + " has " +  data.blog.posts + " posts to process (" + pageCount + " pages)");
    
    for (var currPage = 0; currPage <= pageCount; currPage++) {
        ++numRunningQueries;
        client.posts(program.blog, { limit: 20, offset: (currPage * 20), reblog_info: true }, function (err, data) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            data.posts.forEach(function (post) {
                if(!post.hasOwnProperty('reblogged_from_id') && (post.type.indexOf(program.type) > -1 || allTypes)){
                    //post doesn't have the reblogged fields; it's an original post
                    if (program.json){
                        jsonReturn = jsonReturn.concat(post);
                    }
                    else if(program.html){
                        textReturn = textReturn.concat("Found original " + post.type + " at <a href=\"" + post.post_url + "\">" + post.post_url + "</a> (published on " + post.date + ")<br />\n");
                    }
                    else{
                        textReturn = textReturn.concat("Found original " + post.type + " at " + post.post_url + " (published on " + post.date + ")\n");
                    }
                }
            })
            
            --numRunningQueries;
            if (numRunningQueries === 0) {
                //loop is finished; display JSON if we have it
                if (program.json){
                    console.log(jsonReturn);
                }
                else{
                    console.log(textReturn);
                }
            }
        });
    }
});

