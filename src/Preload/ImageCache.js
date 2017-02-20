class ImageCache {
	constructor() {
		this.hash = {};
		this.cache = [];
	}

	add(url, options = {}) {
		if (!this.hash[url]) {
			this.hash[url] = new Image();

			// if (options.crossOrigin) {
			//     hash[url].crossOrigin = options.crossOrigin;
			// }

			// Create an image tag to hold our downloaded image data
			// var img = document.createElement("img");

			// Create a FileReader to feed the image into our newly-created element
			// let reader = new FileReader();

			// reader.onload = (function(aImg) { 
			// 	return function(e) {
			// 		aImg.src = e.target.result;
			// 	}; 
			// })(this.hash[url]);

			// reader.readAsDataURL(file);

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
