import NamedObject from "./NamedObject";

export default class Audience extends NamedObject {
	public static fromJSON(json: any) {
		return new Audience(json.name, json.uid);
	}

	public static fromJSONList(list: any[]) {
		return list.map((data) => Audience.fromJSON(data));
	}
}
