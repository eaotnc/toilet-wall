import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

class App extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 3,
    lazyRadius: 3,
    savedPictureList:[],
  };
  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
      this.setState({
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      });
    }, 1000);
  }
  handleSavePicture=()=>{
    
      
      const savedPictureList= [...this.state.savedPictureList,this.saveableCanvas.getSaveData() ]
      this.setState({
        savedPictureList
      })
  
  }
  render() {
    const {savedPictureList}=this.state
    return (
      <div>
        <div>
          <button
            onClick={this.handleSavePicture}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
        </div>

        <CanvasDraw
          hideGrid
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />
     
        <button
          onClick={() => {}}
        >
       
        </button>

        { savedPictureList.length>0?
          savedPictureList.map((savedPicture)=>
         <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={savedPicture}
        />)
        :null
      }
      
       
      </div>
    );
  }
}

export default App