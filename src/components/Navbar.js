import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        OBJECT
        <button
          onClick={() => {
            this.props.getObject("start");
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            this.props.getObject("end");
          }}
        >
          end
        </button>
        <button
          onClick={() => {
            this.props.getObject("wall");
          }}
        >
          wall
        </button>
        MAZE
        <button
          onClick={() => {
            this.props.getMazeAlgorithm("base");
          }}
        >
          base
        </button>
        <button>MAKE MAZE</button>
        SHORTEST PATH
        <button
          onClick={() => {
            this.props.getShortPathAlgorithm("dijkstra");
          }}
        >
          dijkstra
        </button>
        <button>FIND PATH</button>
        CLEAR
        <button
          onClick={() => {
            this.props.clearSketch();
          }}
        >
          CLEAR
        </button>
        DISTANCE:
        {this.props.distance}
      </div>
    );
  }
}
