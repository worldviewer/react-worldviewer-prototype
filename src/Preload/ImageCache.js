import UsergridHelper from '../Usergrid/UsergridHelper';

class ImageCache {
	constructor() {
		this.hash = {};
		this.cache = [];

		this.ug = new UsergridHelper();
		this.ug.init();
		this.ug.getCardData();
	}

	add(url, options = {}) {
	    if (!this.hash[url]) {
	        this.hash[url] = new Image();

	        // if (options.crossOrigin) {
	        //     hash[url].crossOrigin = options.crossOrigin;
	        // }

	        this.hash[url].src = url;

	        this.cache.push(this.hash[url]);
	    }
	    return this.hash[url];
	}

	get(url, options) {
	    return this.add(url, options);
	}

	stuff(urls, options) {
	    if (urls.length > 0) {
	        urls.map((url) => this.add(url, options));
	    }
	}
}

export default ImageCache;