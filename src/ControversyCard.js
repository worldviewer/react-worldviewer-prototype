import React, { Component } from 'react';
import base from '../graphics/halton-arp-the-modern-galileo-bbal-card.jpg';
import Bubble from './Bubble';
import Icon from './Icon';
import './ControversyCard.scss';
import OpenSeadragon from 'openseadragon';

class ControversyCard extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	componentDidMount(nextProps, nextState) {
		let deepZoom = OpenSeadragon({
			element: document.querySelector('.Card'),
			showNavigator: true,
			prefixUrl: "pyramid_files/",
			tileSources: {
				Image: {
					xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
					Format: 'jpg',
					Overlap: '0',
					TileSize: '254',
					Size: {
						Height: '9999',
						Width: '7142'
					}
				}
			}
		});
	}

	render() {
		let bubbles = [
			{source: 'bubble0.png', left: '7vw', top: '23vw', width: '24vw', numleft: '20vw', numtop: '4.5vw'},
			{source: 'bubble1.png', left: '6vw', top: '55vw', width: '14vw', numleft: '5.5vw', numtop: '-1vw'},
			{source: 'bubble2.png', left: '21vw', top: '50vw', width: '10vw', numleft: '1vw', numtop: '-0.5vw'},
			{source: 'bubble3.png', left: '37vw', top: '33vw', width: '12vw', numleft: '-1vw', numtop: '3vw'},
			{source: 'bubble4.png', left: '52vw', top: '27vw', width: '16vw', numleft: '14vw', numtop: '6.5vw'},
			{source: 'bubble5.png', left: '70vw', top: '36vw', width: '9vw', numleft: '0vw', numtop: '0vw'},
			{source: 'bubble6.png', left: '69vw', top: '46vw', width: '9vw', numleft: '0.5vw', numtop: '6.5vw'},
			{source: 'bubble7.png', left: '78vw', top: '49vw', width: '16vw', numleft: '11vw', numtop: '0.5vw'}
		];

		let deepZoomStyles = {
			width: '100%',
			height: '100%'
		};

		return (
			<div className="Deep-Zoom-Graphic">
				<div className="Card" style={deepZoomStyles}></div>

				<p className="Title Left">Halton<br/>Arp</p>
				<p className="Title Right">The<br/>Modern<br/>Galileo</p>
				<p className="Summary">He Was a Professional Astronomer Who<br/>Began his Career as Edwin Hubble's Assistant / While Compiling a List of Peculiar Galaxies, Arp Discovered that High-Redshift Quasars are Commonly Associated with or Even Connected by Filaments to Lower-Redshift Galaxies / Since the Big Bang Requires that Differences in Redshift Place the Objects at Different Locations, Astronomers Commonly Reject Arp's Claims / But if he is Right, then there Was No Big Bang</p>

				{ bubbles.map( (el,i) => 
					<Bubble
						key={i}
						left={el.left}
						num={i}
						numleft={el.numleft}
						numtop={el.numtop}
						source={el.source}
						top={el.top}
						width={el.width}
					/>
				)}

				<Icon
					left='78vw'
					top='67vw'
					width='13vw'
				/>
			</div>
		);
	}
}

export default ControversyCard;
