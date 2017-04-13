import React from 'react';
import Radium from 'radium';

const BurgerIcon = Radium(React.createClass({

  propTypes: {
    customIcon: React.PropTypes.element,
    styles: React.PropTypes.object,
    burgerToggle: React.PropTypes.bool
  },

  getLineStyle(index) {
    return {
      position: 'absolute',
      height: '5%',
      width: '40%',
      left: 11,
      right: 20,
      top: 10 * (index * 2) + '%',
      opacity: this.state.hover ? 0.6 : 1
    };
  },

  handleHover() {
    this.setState({hover: !this.state.hover});
  },

  getInitialState() {
    return {hover: false};
  },

  getDefaultProps() {
    return {
      styles: {}
    };
  },

  render() {
    let icon;
    let buttonStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      border: 'none',
      opacity: 0,
      fontSize: 8
    };

    let burgerBoxStyle = {
      display: this.props.burgerToggle ? 'block' : 'none'
    };

    let barsStyle = {
      top: '11px',
      height: '100%',
      position: 'relative'
    };

    if (this.props.customIcon) {
      let extraProps = {
        className: 'bm-icon',
        style: [{width: '100%', height: '100%'}, this.props.styles.bmIcon]
      };
      icon = React.cloneElement(this.props.customIcon, extraProps);
    } else {
      icon = (
        <div style={barsStyle}>
          <span className="bm-burger-bars" style={[this.getLineStyle(0), this.props.styles.bmBurgerBars]} />
          <span className="bm-burger-bars" style={[this.getLineStyle(1), this.props.styles.bmBurgerBars]} />
          <span className="bm-burger-bars" style={[this.getLineStyle(2), this.props.styles.bmBurgerBars]} />
        </div>
      );
    }

    return (
        <div className="bm-outer-circle" style={burgerBoxStyle}>
          <div className="bm-inner-circle">

            <div className="bm-burger-button" style={[{zIndex: 15}, this.props.styles.bmBurgerButton]}>
              {icon}
              <button onClick={this.props.onClick}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
                style={buttonStyle}>
                Open Menu
              </button>
            </div>

          </div>
        </div>
    );
  }
}));

export default BurgerIcon;
