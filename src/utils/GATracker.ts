interface IOptions {
	dimensions?: { [key: string]: string };
	onStarted?: () => void;
	log?: boolean;
	simulated?: boolean;
}

export default class GATracker {

	private static instance: GATracker;

	private gaNewElem: any = {};
	private gaElems: any = {};
	private log: boolean;
	private simulated: boolean;
	private clientId?: string;
	private onStartedOption?: () => void;

	public static getInstance() {
		return GATracker.instance;
	}

	public static create(id: string, options?: IOptions): GATracker {
		return new GATracker(id, options);
	}

	constructor(id: string, options?: IOptions) {
		const currdate: any = new Date();
		this.log = Boolean(options && options.log);
		this.onStartedOption = options && options.onStarted;
		this.simulated = Boolean(options && options.simulated);

		if (this.simulated) {
			requestAnimationFrame(() => {
				this.onStarted.bind(this)();
			});
		} else {
			window.addEventListener("error", (event: any) => { this.trackError(event.error); });
			window.addEventListener("unload", () => { this.trackTiming("JS Dependencies", "unload", performance.now()); });

			/* tslint:disable:no-string-literal semicolon no-unused-expression whitespace align only-arrow-functions */
			(function(i:any,s,o,g,r,a,m) {i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function() {
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*currdate;a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,"script","//www.google-analytics.com/analytics.js","_ga", this.gaNewElem, this.gaElems);
			/* tslint:enable:no-string-literal semicolon no-unused-expression whitespace align only-arrow-functions */

			this.ga()(this.onStarted.bind(this));
		}

		this.ga()("create", id, "auto");
		this.ga()("require", "displayfeatures");

		if (options && options.dimensions) {
			if (this.log) console.log("[GA] Initializing with objects: ", options.dimensions);
			Object.keys(options.dimensions).forEach((key) => {
				this.ga()("set", key, (options.dimensions as any)[key]);
			});
		}

		GATracker.instance = this;
	}

	public trackPage(path: string) {
		if (this.log) console.log(`[GA] Tracking Page [${path}]`);
		this.ga()("send", "pageview", Boolean(path) ? path : undefined);
	}

	public trackEvent(category: string, action: string, label?: string, nonInteraction: boolean = false, obj: object = {}) {
		if (this.log) {
			console.log(`[GA] Tracking Event [${category}] [${action}] [${label}] [${nonInteraction ? "non-interactive" : ""}]`, obj);
		}

		this.ga()("send", {
			hitType: "event",
			eventCategory: category,
			eventAction: action,
			eventLabel: label,
			nonInteraction,
			...obj,
		});
	}

	public trackTiming(category: string, variable: string, value: number, label?: string, obj: object = {}) {
		if (this.log) {
			console.log(`[GA] Tracking Timing [${category}] [${variable}] [${value}] [${label}]`);
		}

		this.ga()("send", {
			hitType: "timing",
			timingCategory: category,
			timingVar: variable,
			timingValue: value,
			timingLabel: label,
		});
	}

	public trackPerformance(responseEndTimeMetricName: string, domLoadTimeMetricName: string, windowLoadTimeMetricName: string) {
		// https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/#loading-analyticsjs
		// Only track performance in supporting browsers.
		if (!(window.performance && window.performance.timing)) return;

		// If the window hasn't loaded, run this function after the `load` event.
		if (document.readyState !== "complete") {
			window.addEventListener("load", () => {
				this.trackPerformance(responseEndTimeMetricName, domLoadTimeMetricName, windowLoadTimeMetricName);
			});
			return;
		}

		const nt = performance.timing;
		const navStart = nt.navigationStart;

		const responseEnd = Math.round(nt.responseEnd - navStart);
		const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
		const windowLoaded = Math.round(nt.loadEventStart - navStart);

		// In some edge cases browsers return very obviously incorrect NT values,
		// e.g. 0, negative, or future times. This validates values before sending.
		const allValuesAreValid = [responseEnd, domLoaded, windowLoaded].every((value) => value > 0 && value < 1e6);

		if (allValuesAreValid) {
			this.trackEvent("Navigation Timing", "track", undefined, true, {
				[responseEndTimeMetricName]: responseEnd,
				[domLoadTimeMetricName]: domLoaded,
				[windowLoadTimeMetricName]: windowLoaded,
			});
		}
	}

	public setDimension(key: string, value: string) {
		if (this.log) console.log(`[GA] Setting dimension [${key}] to [${value}]`);
		this.ga()("set", key, value);
	}

	public getClientId() {
		return this.clientId;
	}

	private onStarted(tracker: any) {
		this.clientId = tracker ? tracker.get("clientId") : undefined;

		if (this.onStartedOption) this.onStartedOption();
	}

	private ga(): any {
		if (this.simulated) {
			return () => null;
		} else {
			return (window as any)._ga;
		}
	}

	private trackError(error: any) {
		this.trackEvent("script", "error", (error && error.stack) || "(not set)", true);
	}

	// TODO: refs
	/*
	var ref = undefined;
	if (document.referrer == undefined || document.referrer.length == 0) {
		if (!!navigator.userAgent.match(/twitter/i))      ref = "http://app.twitter.com";
		if (!!navigator.userAgent.match(/fb_iab\/fb4a/i)) ref = "http://app.facebook.com";
		if (!!navigator.userAgent.match(/fban\/fbios/i))  ref = "http://app.facebook.com";
		if (!!navigator.userAgent.match(/pinterest/i))    ref = "http://app.pinterest.com";
	}
	if (ref != undefined) ga("set", "referrer", ref);
	*/

	// TODO: social events
	/*
	window.attachSocialEvents = function(__query, __networkId) {
		var elements = document.querySelectorAll(__query);
		for (var i = 0; i < elements.length; i++) {
			var currTarget = elements[i];
			currTarget.addEventListener("click", function(__event) {
				//console.log("=> " + __networkId + " => " + currTarget.getAttribute("sharetarget"));
				ga("send", "social", __networkId, "share", currTarget.getAttribute("sharetarget"));
			});
		}
	};
	*/
}


/*
	static trackPage(pageId) {
		if (pageId.substr(0, 1) != "/") pageId = "/" + pageId;

		if (!!window.ga && pageId != MiniTracker.lastTrackedPageId) {
			window.ga("send", "pageview", pageId);

			MiniTracker.lastTrackedPageId = pageId;

			if (MiniTracker.isLogging) console.log("[TRACK] Page: [" + pageId + "]");
		}
	}

	static trackEvent(category, action, label, value, nonInteraction) {
		// Eg. button, click, nav button, 4
		if (!!window.ga) {
			window.ga("send", "event", category, action, label, value, {
				"nonInteraction": nonInteraction,
				"page": MiniTracker.lastTrackedPageId
			});

			if (MiniTracker.isLogging) {
				console.log("[TRACK] Event: Category [" + category + "], Action [" + action + "], Label [" + label + "], Value [" + value + "] ");
			}
		}
	}
*/
