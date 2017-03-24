import React from 'react';
import OpenSeadragon from 'openseadragon';
import './DeepZoom.scss';

const DeepZoomStateless = React.createClass({
	getInitialState: function() {
		return {
			cardStyle: {
				width: '100vw',
				height: '140vw'
			}
		}
	},

	createViewer: function() {
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

		let resize = () => this.setupResizeHandler();

		window.addEventListener('resize', resize);
		this.setupZoomHandler(this.viewer);
	},

	// Change overlays based on OpenSeadragon events
	setupZoomHandler: function(viewer) {
		viewer.addHandler('zoom', (data) => {
			this.props.toggleOverlayState(data.zoom);
		});
	},

	setupResizeHandler: function() {
		let width = this.refs.clientWidth,
			height = parseInt(width, 10)*1.4;

		this.setState({
			cardStyle: {
				width,
				height: height + 'vw'
			}
		});
	},

	componentDidMount: function () {
		this.createViewer();
	},

	render: function() {
		return (
			<div
				ref={node => { this.root = node; }}
				className="Card"
				id="openseadragon"
				style={this.state.cardStyle} />
		);
	}
});

export default DeepZoomStateless;
