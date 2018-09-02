import NamedObject from "./NamedObject";

export default class Track extends NamedObject {
	public static fromJSON(json: any) {
		return new Track(json.name, json.uid || json.id);
	}

	public static fromJSONList(list: any[]) {
		return list.map((data) => Track.fromJSON(data));
	}
}
