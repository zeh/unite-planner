import Audience from './Audience';
import Format from './Format';
import Location from './Location';
import Speaker from './Speaker';
import Topic from './Topic';
import Track from './Track';

export default class Session {
	public id: string;
	public title: string;
	public isScheduled: boolean;
	public tracks: Track[];
	public topics: Topic[];
	public location: Location;
	public audience: Audience;
	public format: Format;
	public date: Date;
	public startTime: Date;
	public endTime: Date;
	public timezoneOffset: number;
	public publishedTime: Date;
	public description: string[];
	public speakers: Speaker[];

	public static fromJSON(json: any) {
		const session = new Session();
		session.id = json.sessionID;
		session.title = json.title;
		session.isScheduled = json.isScheduled === 1;
		session.tracks = Track.fromJSONList(json.tracks);
		session.topics = Topic.fromJSONList(json.topics);
		session.location = new Location(json.location, json.locationID);
		session.audience = new Audience(json.audiencwe, json.audienceID);
		session.format = new Format(json.format, json.formatID, json.formatDuration);
		session.date = new Date(`${json.startTime.substr(0, 10)}T00:00:00`);
		session.startTime = new Date(json.startTimeOffset);
		session.endTime = new Date(json.endTimeOffset);
		const timezoneOffset = json.startTimeOffset.substr(19, 6).split(':');
		session.timezoneOffset = Number.parseInt(timezoneOffset[0], 10) * 60 + Number.parseInt(timezoneOffset[1], 10) * -1;
		session.publishedTime = new Date(json.published);
		session.description = json.texts.text.map((data: any) => data.value).filter((text: string) => Boolean(text));
		session.speakers = Speaker.fromJSONList(json.speakers.speaker);
		return session;
	}

	public static fromJSONList(list: any[]) {
		return list.map((data) => Session.fromJSON(data));
	}

	public constructor() {
		//
	}
}
