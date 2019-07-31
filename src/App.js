import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import { Button } from 'antd';
import './App.css'
import 'antd/dist/antd.css'; 
import Sky from './sky'
class App extends Component {
  state = {
    color: "#ffc600",
    width: 320,
    height: 320,
    brushRadius: 3,
    lazyRadius: 3,
    savedPictureList:[],
  };

  handleSavePicture=()=>{
    const data =JSON.parse(this.saveableCanvas.getSaveData())
    if(data.lines.length>0){
      const savedPictureList= [...this.state.savedPictureList,this.saveableCanvas.getSaveData() ]
      this.setState({
        savedPictureList
      })
    }
  
  }
  render() {
    const {savedPictureList}=this.state
    return (
      <div className="App">
        <Sky
         size='50px'
         time={50} 
         how={savedPictureList.length+5} 
         savedPictureList={savedPictureList}
         > 
           </Sky>
          <div className="canvas-drower ">
            <div className="label">
              Eao toilet Wall
            </div>
          <CanvasDraw
            style={{background: "#6b6b6b47" ,zIndex:"25",borderRadius:'14px'}}
            hideGrid
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
          />
            <div>
              <Button onClick={this.handleSavePicture} > Save  </Button>
              <Button onClick={() => {this.saveableCanvas.clear()}} >
                Clear
              </Button>
              <Button onClick={() => {this.saveableCanvas.undo()}}  >
                Undo
              </Button>
            </div>
          </div>
      </div>
    );
  }
}

export default App