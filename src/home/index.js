import React, { Component } from 'react'
import CanvasDraw from 'react-canvas-draw'
import firebase from 'firebase'
import { Button } from 'antd'
import './App.css'
import 'antd/dist/antd.css'
import Sky from '../sky'
import { db } from '../firebase'

class Home extends Component {
  state = {
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    width: 400,
    height: 350,
    brushRadius: 3,
    lazyRadius: 5,
    oldpic: [],
    savedPictureList: [],
  };

  componentDidMount() {
    db.collection('toilet-wall').get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data().vector)
      this.setState({ oldpic: data, loading: false })
    })
  }

  handleSavePicture=() => {
    this.handleRandomColor()
    const ParseData = JSON.parse(this.saveableCanvas.getSaveData())
    const data = this.saveableCanvas.getSaveData()
    if (ParseData.lines.length > 0) {
      this.setState({
        savedPictureList: [
          ...this.state.savedPictureList,
          data],
      })
      db.collection('toilet-wall').doc().set({
        vector: data,
      })
    }
  }

  handleRandomColor=() => {
    this.setState({ color: `#${Math.floor(Math.random() * 16777215).toString(16)}` })
  }

  render() {
    const { savedPictureList, oldpic } = this.state
    return (
      <div className="App">

        <Sky
          size="50px"
          time={50}
          how={Math.min(savedPictureList.length + oldpic.length + 5, 50)}
          savedPictureList={[...oldpic, ...savedPictureList]}
        />
        <div className="canvas-drower ">
          <Button className="refresh-bt" onClick={this.handleRandomColor}>refresh</Button>
          <div className="label">Toilet Wall</div>

          <CanvasDraw
            style={{ background: '#6b6b6b47', zIndex: '25', borderRadius: '14px' }}
            hideGrid
            ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
          />

          <div>
            <Button onClick={() => { this.handleSavePicture() }}> Save</Button>
            <Button onClick={() => { this.saveableCanvas.clear() }}>Clear</Button>
            <Button onClick={() => { this.saveableCanvas.undo() }}>Undo</Button>
            <Button style={{ marginLeft: '10px' }} onClick={this.handleRandomColor}> change Color  </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
