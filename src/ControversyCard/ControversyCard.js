import React, { Component } from 'react';
import Bubble from '../Bubble/Bubble';
import Icon from '../Icon/Icon';
import './ControversyCard.scss';
import DeepZoom from '../DeepZoom/DeepZoom';

class ControversyCard extends Component {
	handleZoom() {
		console.log('toggle bubbles, icon and text');
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

		return (
			<div className="Deep-Zoom-Graphic">
				<DeepZoom
					url={process.env.PUBLIC_URL + "/pyramid_files/"}
					onZoom={this.handleZoom}
				/>

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
