import React, { Component } from 'react';

// Define your dynamic content data
const slideshowData = [
  { id: 1, imageSrc: 'https://tinyurl.com/mrxr5w9p' },
  { id: 2, imageSrc: 'https://tinyurl.com/mstpbjnb' },
  { id: 3, imageSrc: 'https://tinyurl.com/yc7xsr3f' },
  { id: 4, imageSrc: 'https://tinyurl.com/2hbe7p9c' },
  { id: 5, imageSrc: 'https://tinyurl.com/5k8zv45b' },
  { id: 6, imageSrc: 'https://tinyurl.com/2p8a6yb4' },
  { id: 7, imageSrc: 'https://tinyurl.com/5n969jev' },
  { id: 8, imageSrc: 'https://tinyurl.com/s4ak5e3t' },
  { id: 9, imageSrc: 'https://tinyurl.com/8szesmby' },
];

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.nextImage, 5000); // Change image every 5 seconds
  }

  componentWillUnmount() {
    clearInterval(this.timer); // Clear the interval when the component unmounts
  }

  nextImage = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % slideshowData.length,
    }));
  };

  render() {
    const { currentIndex } = this.state;
    return (
        <div className="card mx-auto mt-1" style={{ width: '800px' }}>
          <img
            className="card-img-top"
            src={slideshowData[currentIndex].imageSrc}
            alt={`Slide ${currentIndex}`}
            style={{ width: '100%', height: '100%' }} // Set fixed width and height
          />
        </div>
      );
      
      
      
  }
}

export default Slideshow;
