import React from 'react';

let Bubble = function statelessFunctionComponentClass(props) {
	let source = require('../graphics/' + props.source);

	let divStyle = {
		left: props.left,
		position: 'absolute',
		top: props.top,
		width: props.width
	};

	// Corrects an issue with creating circles w/ border-radius on mobile devices
	let roundedBorderStyle = {
		backgroundColor: '#edf5f1',
		border: '.5vw solid #edf5f1',
		borderRadius: '50%',
		height: '2vw',
		left: props.numleft,
		top: props.numtop,
		position: 'absolute',
		width: '2vw'
	}

	let bubbleNumberStyle = {
		backgroundColor: '#edf5f1',
		borderRadius: '50%',
		height: '2vw',
		position: 'absolute',
		width: '2vw'
	};

	let imgStyle = {
		width: '100%'
	};

	let bubbleNumber = props.num;

	return (
		<div style={divStyle}>
			<img
				alt="Figure"
				className={"Bubble" + bubbleNumber}
				src={source}
				style={imgStyle}
			/>

			<div style={roundedBorderStyle}>
				<div
					alt="Slide Number"
					className="Bubble-Number"
					style={bubbleNumberStyle}
				>
					<p>{bubbleNumber + 1}</p>
				</div>
			</div>
		</div>
	);
};

export default Bubble;
