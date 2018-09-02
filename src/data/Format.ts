import NamedObject from "./NamedObject";

export default class Format extends NamedObject {
	public duration: number;

	public static fromJSON(json: any) {
		return new Format(json.name, json.uid, json.duration);
	}

	public static fromJSONList(list: any[]) {
		return list.map((data) => Format.fromJSON(data));
	}

	public constructor(name: string, id: string, duration: number|string) {
		super(name, id);
		this.duration = typeof duration === 'string' ? Number.parseInt(duration, 10) : duration;
	}
}
