'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const twemoji = require("twemoji");
const io = require("socket.io-client");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:twitter`);
const tweets = nodecg.Replicant('tweets');
const fanartTweets = nodecg.Replicant('fanartTweets');
nodecg.listenFor('acceptTweet', (tweet) => {
    if (!nodecg.bundleConfig.twitter.debug) {
        removeTweetById(tweet.id_str);
    }
    nodecg.sendMessage('showTweet', tweet);
});
nodecg.listenFor('acceptFanart', (tweet) => {
    if (!nodecg.bundleConfig.twitter.debug) {
        removeTweetById(tweet.id_str);
    }
    nodecg.sendMessage('showFanart', tweet);
});
nodecg.listenFor('rejectTweet', removeTweetById);
const socket = io.connect(nodecg.bundleConfig.twitter.websocketUrl);
socket.once('connect', () => {
    socket.on('authenticated', () => {
        log.info('Twitter socket authenticated.');
    });
    socket.on('unauthorized', (err) => {
        log.error('There was an error with the authentication:', (err && err.message) ? err.message : err);
    });
    socket.on('twitter-webhook-payload', (payload) => {
        // `payload` will be an object in the format described here:
        // https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/guides/account-activity-data-objects
        if (!payload) {
            return;
        }
        if (payload.favorite_events) {
            payload.favorite_events.forEach(favoriteEvent => {
                // Discard favorites not made by us.
                if (favoriteEvent.user.screen_name.toLowerCase() !== 'gamesdonequick') {
                    return;
                }
                if (favoriteEvent.favorited_status) {
                    addTweet(favoriteEvent.favorited_status);
                }
            });
        }
        if (payload.tweet_create_events) {
            payload.tweet_create_events.forEach(tweetCreateEvent => {
                // Discard tweets not made by us.
                if (tweetCreateEvent.user.screen_name.toLowerCase() !== 'gamesdonequick') {
                    return;
                }
                // Discard quoted statuses because we can't show them.
                if (tweetCreateEvent.quoted_status) {
                    return;
                }
                if (tweetCreateEvent.retweeted_status) {
                    const retweetedStatus = tweetCreateEvent.retweeted_status;
                    retweetedStatus.gdqRetweetId = tweetCreateEvent.id_str;
                    addTweet(retweetedStatus);
                    return;
                }
                // Discard @ replies because we don't want to show them.
                if (tweetCreateEvent.in_reply_to_user_id) {
                    return;
                }
                addTweet(tweetCreateEvent);
            });
        }
    });
    socket.emit('authentication', { preSharedKey: nodecg.bundleConfig.twitter.preSharedKey });
});
/**
 * Adds a Tweet to the queue.
 * @param tweet - The tweet to add.
 */
function addTweet(tweet) {
    // Don't add the tweet if we already have it
    const isDupe = tweets.value.find((t) => t.id_str === tweet.id_str) ||
        fanartTweets.value.find((t) => t.id_str === tweet.id_str);
    if (isDupe) {
        return;
    }
    // Parse emoji.
    tweet.text = twemoji.parse(tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text);
    // Replace newlines with spaces
    tweet.text = tweet.text.replace(/\n/ig, ' ');
    // Highlight the #AGDQ2018 hashtag.
    tweet.text = tweet.text.replace(/#agdq2019/ig, '<span class="hashtag">#AGDQ2018</span>');
    if (tweet.extended_tweet &&
        tweet.extended_tweet.extended_entities &&
        tweet.extended_tweet.extended_entities.media &&
        tweet.extended_tweet.extended_entities.media.length > 0) {
        tweet.gdqMedia = tweet.extended_tweet.extended_entities.media;
        delete tweet.extended_tweet.extended_entities.media;
    }
    else if (tweet.extended_entities &&
        tweet.extended_entities.media &&
        tweet.extended_entities.media.length > 0) {
        tweet.gdqMedia = tweet.extended_entities.media;
        delete tweet.extended_entities.media;
    }
    else if (tweet.entities.media &&
        tweet.entities.media.length > 0) {
        tweet.gdqMedia = tweet.entities.media;
        delete tweet.entities.media;
    }
    // If the tweet has media, place it into the Fanart queue.
    // Else, place it into the normal tweet queue.
    if (tweet.gdqMedia) {
        fanartTweets.value.push(tweet);
    }
    else {
        tweets.value.push(tweet);
    }
}
/**
 * Removes a Tweet (by id) from the queue.
 * @param idToRemove - The ID string of the Tweet to remove.
 * @returns The removed tweet. "Undefined" if tweet not found.
 */
function removeTweetById(idToRemove) {
    if (typeof idToRemove !== 'string') {
        throw new Error(`[twitter] Must provide a string ID when removing a tweet. ID provided was: ${idToRemove}`);
    }
    let didRemoveTweet = false;
    [tweets, fanartTweets].forEach(tweetReplicant => {
        tweetReplicant.value.some((tweet, index) => {
            if (tweet.id_str === idToRemove || tweet.gdqRetweetId === idToRemove) {
                tweetReplicant.value.splice(index, 1);
                didRemoveTweet = true;
                return true;
            }
            return false;
        });
    });
    return didRemoveTweet;
}
//# sourceMappingURL=twitter.js.map