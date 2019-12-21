import React from "react";
import Graph from "./components/GraphSketch";
import Navbar from "./components/Navbar";
import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: "wall",
      mazeAlgorithm: "base",
      shortPathAlgorithm: "dijkstra",
      distance: 0
    };
    this.getObject = this.getObject.bind(this);
    this.getMazeAlgorithm = this.getMazeAlgorithm.bind(this);
    this.getShortPathAlgorithm = this.getShortPathAlgorithm.bind(this);
    this.clearSketch = this.clearSketch.bind(this);
    this.returnClear = this.returnClear.bind(this);
    this.getDistance = this.getDistance.bind(this);
  }

  getObject = object => {
    this.setState({ object: object });
  };
  getMazeAlgorithm = mazeAlgorithm => {
    this.setState({ mazeAlgorithm: mazeAlgorithm });
  };
  getShortPathAlgorithm = shortPathAlgorithm => {
    this.setState({ shortPathAlgorithm: shortPathAlgorithm });
  };
  clearSketch = () => {
    this.setState({ clear: true });
  };
  returnClear = () => {
    if (this.state.clear) {
      this.setState({ clear: false });
      return true;
    }
    return false;
  };
  getDistance = distance => {
    this.setState({ distance: distance });
  };
  render() {
    return (
      <div>
        <Navbar
          getObject={this.getObject}
          getMazeAlgorithm={this.getMazeAlgorithm}
          getShortPathAlgorithm={this.getShortPathAlgorithm}
          clearSketch={this.clearSketch}
          distance={this.state.distance}
        />
        <Graph
          className="center"
          object={this.state.object}
          returnClear={this.returnClear}
          getDistance={this.getDistance}
        />
      </div>
    );
  }
}
