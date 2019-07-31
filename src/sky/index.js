import React from 'react'
import PropTypes from 'prop-types'
import Item from './item'

class Sky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
    }
    this.movement = this.movement.bind(this);
  }
 
  componentDidMount() {
    this.initState()
  }

  componentWillReceiveProps(){
    this.initState()
  }
  
   initState=()=>{
    const many = this.props.how;
    console.log('how many',many)
    const temp_moves = [];
    for (let i = 0; i < many; i++) {
      temp_moves.push(this.movement());
    }
    this.setState({
      moves: temp_moves
    });
  }
  

  movement() {
    const rotation = Math.floor((Math.round(Math.random()) * 2 - 1) * 600);
    const fromX = Math.floor((Math.random() * window.innerWidth));
    const fromY = Math.floor((Math.random() * window.innerHeight * 1.5));
    const toX = Math.floor((Math.random() * window.innerWidth) * (Math.round(Math.random()) * 2 - 1));
    const toY = Math.floor((Math.random() * window.innerHeight * 1.5) * (Math.round(Math.random()) * 2 - 1));
    const temp = {
      rotation,
      fromX,
      fromY,
      toX,
      toY,
    };
    return temp;
  }

  render() {
    const { savedPictureList, background, size, time } = this.props;
    const outerStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      zIndex: '-1',
      background
    }

    return (
      <div style={outerStyle} id="sky">
        {this.state.moves.map((e, i) => {
          const conditional = Math.floor(Math.random() * savedPictureList.length);
          return <Item
            savedPicture={savedPictureList[conditional]}
            from={[e.fromX, e.fromY]}
            to={[e.toX, e.toY]}
            rotation={e.rotation}
            size={size}
            time={time}
            key={i}
          > {this.props.children}
          </Item>
        })}
      </div>
    );
  }
}


Sky.defaultProps = {
  size: '150px',
  background: '',
  time: 20,
  children: null,
}

Sky.propTypes = {
  children: PropTypes.object,
  size: PropTypes.string,
  background: PropTypes.string,
  time: PropTypes.number,
  how: PropTypes.any.isRequired,
  savedPictureList: PropTypes.object.isRequired
}

export default Sky;