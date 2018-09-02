import Audience from './Audience';
import Format from './Format';
import Location from './Location';
import Session from './Session';
import Speaker from "./Speaker";
import Topic from './Topic';
import Track from './Track';

export default class Schedule {
	public generatedDate: Date;
	public timezone: string;
	public eventName: string;
	public startDate: Date;
	public endDate: Date;
	public sessions: Session[];
	public locations: Location[];
	public tracks: Track[];
	public topics: Topic[];
	public formats: Format[];
	public audiences: Audience[];
	public speakers: Speaker[];

	public static fromJSON(json: any): Schedule {
		const {
			result,
			data
		} = json;

		// Basic data parse
		const schedule = new Schedule();
		schedule.generatedDate = new Date(result.generated);
		schedule.timezone = data.timezone;

		schedule.eventName = data.event.name;
		schedule.startDate = new Date(`${data.event.dateBegin}T00:00:00`);
		schedule.endDate = new Date(`${data.event.dateEnd}T00:00:00`);

		schedule.locations = Location.fromJSONList(data.locations);
		schedule.tracks = Track.fromJSONList(data.tracks);
		schedule.topics = Topic.fromJSONList(data.topics);
		schedule.formats = Format.fromJSONList(data.formats);
		schedule.audiences = Audience.fromJSONList(data.audiences);
		schedule.sessions = Session.fromJSONList(data.sessions);
		schedule.speakers = [];

		// Reconcile lists on each session, setting them from the main list
		schedule.sessions.forEach((session) => {
			session.tracks = session.tracks.map((t) => Schedule.getListInstance(t, schedule.tracks));
			session.topics = session.topics.map((t) => Schedule.getListInstance(t, schedule.topics));
			session.location = Schedule.getListInstance(session.location, schedule.locations);
			session.audience = Schedule.getListInstance(session.audience, schedule.audiences);
			session.format = Schedule.getListInstance(session.format, schedule.formats);
			session.speakers = session.speakers.map((s) => Schedule.getListInstance(s, schedule.speakers));
		});

		return schedule;
	}

	/**
	 * Searches for an item in a list by id, and returns that instance instead
	 * This also adds to the list if not there already.
	 */
	private static getListInstance<T extends { id: string }>(original: T, list: T[]): T {
		const existingItem = list.find((i) => i.id === original.id);
		if (existingItem) {
			return existingItem;
		} else {
			list.push(original);
			return original;
		}
	}

	public constructor() {
		//
	}
}
