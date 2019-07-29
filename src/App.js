import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import { Button } from 'antd';
import './App.css'
import 'antd/dist/antd.css'; 
import Sky from './sky'
import reactLogo from './react.png'
class App extends Component {
  state = {
    color: "#ffc600",
    width: 320,
    height: 320,
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
    }, 1500);
  }
  handleSavePicture=()=>{
    const data =JSON.parse(this.saveableCanvas.getSaveData())
    console.log('this.saveableCanvas.getSaveData()', data.lines)
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
        //  background={'blue'}
         time={200} 
         how={3} 
         images={{
           0:reactLogo
          }}

         > 
           { savedPictureList.length>0?
          savedPictureList.map((savedPicture)=>
         <CanvasDraw
          style={{background: "#282c34"}}
          disabled
          hideGrid 
          canvasWidth={this.state.width-30}
          canvasHeight={this.state.height-30}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={savedPicture}
        />)
        :null
      }
           </Sky>
          <div className="canvas-drower ">
            <div className="label">
              Eao toilet Wall
            </div>
            
          <CanvasDraw
            style={{background: "#6b6b6b47" ,zIndex:"25",borderRadius:'14px'}}
            hideGrid
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
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