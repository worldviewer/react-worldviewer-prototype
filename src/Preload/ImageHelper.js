import ImageCache from './ImageCache';
import Backend from '../Backend/Backend';

class ImageHelper {
	constructor() {
		this.imageCache = new ImageCache();
		this.backend = new Backend();
	}

    loadImage(url, options) {
        const image = this.imageCache.get(url, options);

        let asset = url.split('/'),
        	len = asset.length,
        	uuid = asset[len-1],
        	folder = asset[len-2];

        this.ug.downloadAsset(folder, uuid);

        return new Promise((resolve, reject) => {
            const handleSuccess = () => {
                resolve(image);
            };
            const handleError = () => {
                reject(image);
            };

            if (image.complete) {
                // image is loaded, go ahead and change the state

                if(image.naturalWidth && image.naturalHeight) {
                    // successful load
                    handleSuccess();
                } else {
                    handleError();
                }

            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', handleError, false);
            }
        });
    }

    loadImages(urls, options) {
        const promises = urls.map(url => this.loadImage(url, options));
        return Promise.all(promises);
    }

    // preload without caring about the result
    stuffImages(urls, options) {
        this.imageCache.stuff(urls, options);
    }
}

export default ImageHelper;
