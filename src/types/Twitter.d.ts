export interface Tweet {
	id_str: string;
	truncated: boolean;
	text: string;
	entities: TweetEntities;
	extended_entities: TweetEntities;
	extended_tweet?: {
		full_text: string;
		extended_entities: TweetEntities;
	};
	in_reply_to_user_id: string;
	user: User;
	gdqRetweetId?: string;
	gdqMedia?: TweetMedia[];
}

export interface User {
	id: number;
	id_str: string;
	name: string;
	screen_name: string;
}

export interface TweetEntities {
	media?: TweetMedia[];
}

export interface TwitterAccountActivityPayload {
	favorite_events?: TweetFavoriteEvents[];
	tweet_create_events?: TweetCreateEvents[];
}

export interface TweetFavoriteEvents extends Tweet {
	favorited_status: Tweet;
	user: User;
}

export interface TweetCreateEvents extends Tweet {
	quoted_status: Tweet;
	retweeted_status: Tweet;
	user: User;
}

export interface TweetMedia {
	[key: string]: any;
}
