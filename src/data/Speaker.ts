export default class Speaker {
	public id: string;
	public personId: string;
	public firstName: string;
	public lastName: string;
	public title: string;
	public company: string;
	public twitter: string;
	public linkedIn: string;
	public bio: string;
	public url: string;
	public image: string;

	public static fromJSON(json: any) {
		const speaker = new Speaker();
		speaker.id = json.speakerID;
		speaker.personId = json.personID;
		speaker.firstName = json.firstName || '';
		speaker.lastName = json.lastName || '';
		speaker.title = json.title || undefined;
		speaker.company = json.company || undefined;
		speaker.twitter = json.twitter || undefined;
		speaker.linkedIn = json.linkedIn || undefined;
		speaker.bio = json.bio || '';
		speaker.url = json.url && json.url.length > 7 ? json.url : undefined;
		speaker.image = json.image || undefined;
		return speaker;
	}

	public static fromJSONList(list: any[]) {
		return list && Array.isArray(list) ? list.map((data) => Speaker.fromJSON(data)) : [];
	}

	public constructor() {
		//
	}
}
