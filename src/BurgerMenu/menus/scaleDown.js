import menuFactory from '../menuFactory.jsx';

const styles = {

  pageWrap(isOpen, width) {
    return {
      transform: isOpen ? '' : `translate3d(0, 0, -75vw)`,
      transformOrigin: '100%',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s'
    };
  },

  outerContainer() {
    return {
      perspective: '1500px'
    };
  }
};

export default menuFactory(styles);
