import React from 'react';
import OpenSeadragon from 'openseadragon';
import './DeepZoom.scss';

const DeepZoom = React.createClass({
	getInitialState: function () {
		let width = document.documentElement.clientWidth;

		return {
			cardStyle: {
				width: width,
				height: width*1.4
			}
		}
	},

	// shouldComponentUpdate: function () {
	// 	return false;
	// },

	createViewer: function () {
		this.viewer = OpenSeadragon({
			id: 'openseadragon',
			constrainDuringPan: true,
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

		window.onresize = this.setupResizeHandler;
	},

	// Change overlays based on OpenSeadragon events
	setupZoomHandler: function () {

	},

	setupResizeHandler: function () {
		let width = document.documentElement.clientWidth;

		this.setState({
			cardStyle: {
				width: width,
				height: width*1.4
			}
		});

		if (this.viewer.isFullPage()) {
			this.showOverlays();
		} else {
			this.hideOverlays();
		}
	},

	// Show overlays if zoom event ends and we are at home
	showOverlays: function () {
		console.log('show overlays');
	},

	// Hide overlays at the start of all zoom events
	hideOverlays: function () {
		console.log('hide overlays');
	},

	componentDidMount: function () {
		this.createViewer();
	},

	render: function () {
		return (
			<div className="Card" id="openseadragon" style={this.state.cardStyle}></div>
		);
	}
});

export default DeepZoom;
