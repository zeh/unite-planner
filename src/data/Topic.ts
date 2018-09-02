import NamedObject from "./NamedObject";

export default class Topic extends NamedObject {
	public static fromJSON(json: any) {
		return new Topic(json.name, json.uid || json.id);
	}

	public static fromJSONList(list: any[]) {
		return list.map((data) => Topic.fromJSON(data));
	}
}
