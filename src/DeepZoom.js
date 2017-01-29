import React from 'react';
import OpenSeadragon from 'openseadragon';

const DeepZoom = React.createClass({
	// shouldComponentUpdate: function () {
	// 	return false;
	// },

	createViewer: function() {
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
				Image: {
		            xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
		            Url: this.props.url,
		            Format: 'jpg',
		            Overlap: '0',
		            TileSize: '256',
		            Size: {
		                Height: '9999',
		                Width: '7142'
		            }
				}
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
		this.createViewer();
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
