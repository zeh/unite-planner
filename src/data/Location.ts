import NamedObject from "./NamedObject";

export default class Location extends NamedObject {
	public static fromJSON(json: any) {
		return new Location(json.name, json.uid);
	}

	public static fromJSONList(list: any[]) {
		return list.map((data) => Location.fromJSON(data));
	}
}
