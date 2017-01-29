import React from 'react';
import OpenSeadragon from 'openseadragon';

const DeepZoom = React.createClass({
	// shouldComponentUpdate: function () {
	// 	return false;
	// },

	createViewer: function(data) {
		this.viewer = OpenSeadragon({
			id: 'openseadragon',
			visibilityRatio: 1.0,
			defaultZoomLevel: 1,
			minZoomLevel: 1,
			maxZoomLevel: 20,
			autoResize: true,
			showZoomControl: false,
			showHomeControl: false,
			showFullPageControl: false,
			showSequenceControl: false,
			tileSources: {
				type: 'legacy-image-pyramid',
				levels: [
					{
						url: this.props.url,
						height: data.naturalHeight,
						width: data.naturalWidth
					}
				]
			}
		});
	},

	// Change overlays based on OpenSeadragon events
	setupZoomHandler: function() {

	},

	// Show overlays if zoom event ends and we are at home
	showOverlays: function() {

	},

	// Hide overlays at the start of all zoom events
	hideOverlays: function() {

	},

	componentDidMount: function () {
		let loadImage = (src) => new Promise (
			function (resolve, reject) {
				let img = document.createElement('img');

				img.addEventListener('load', () => {
					resolve(img); 
				});

				img.addEventListener('error', (err) => { reject(err); });
				img.src = src;
			}
		);

		loadImage(this.props.url)
			.then( data => {
				this.createViewer(data);
				this.setupZoomHandler();
			});
	},

	render: function () {
		let width = document.documentElement.clientWidth;

		let cardStyle = {
			width: width,
			height: width*1.4
		}

		return (
			<div className="Card" id="openseadragon" style={cardStyle}></div>			
		);
	}
});

export default DeepZoom;