import React, { Component } from "react";
import Sketch from "react-p5";
const ShortestPathAlgorithms = require("./ShortestPath/ShortestPath");

// 0-> free
// 1-> start
// 2-> maze wall
// 3-> border wall
// 4-> end

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.objectDraw = {
      start: this.placeStart,
      end: this.placeEnd,
      wall: this.placeMazeWall
    };
  }

  setup = (p5, canvasParentRef) => {
    this.width = p5.windowWidth * 0.9; //pixels
    this.height = p5.windowHeight * 0.9; //pixels
    this.mazeHeight = 60; //units
    this.mazeWidth = 120; //units
    this.mazeHeightUnit = this.height / this.mazeHeight; // pixels/unit
    this.mazeWidthUnit = this.width / this.mazeWidth; // pixels/unit
    p5.createCanvas(this.width, this.height).parent(canvasParentRef);
    this.initGrid(p5);
    this.place = this.empty;
    this.startPlaced = false;
    this.startCoords = [];
    this.endPlaced = false;
    this.endCoords = [];
  };

  initGrid(p5) {
    this.graph = [];
    for (let i = 0; i < this.mazeHeight; i++) {
      var row = [];
      for (let j = 0; j < this.mazeWidth; j++) {
        if (
          i === 0 ||
          j === 0 ||
          i === this.mazeHeight - 1 ||
          j === this.mazeWidth - 1
        ) {
          row.push(3);
          p5.fill(41, 179, 163);
        } else {
          p5.fill(255);
          row.push(0);
        }
        p5.rect(
          this.mazeWidthUnit * j,
          this.mazeHeightUnit * i,
          this.mazeWidthUnit,
          this.mazeHeightUnit
        );
      }
      this.graph.push(row);
    }
  }

  calculateIndex = (X, Y) => {
    let j = parseInt(X / this.mazeWidthUnit);
    let i = parseInt(Y / this.mazeHeightUnit);
    return [i, j];
  };
  colourBox = (p5, index, fillValue) => {
    let i = index[0],
      j = index[1];
    if (typeof fillValue === "number") {
      p5.fill(fillValue);
    } else {
      p5.fill(fillValue[0], fillValue[1], fillValue[2]);
    }
    p5.rect(
      this.mazeWidthUnit * j,
      this.mazeHeightUnit * i,
      this.mazeWidthUnit,
      this.mazeHeightUnit
    );
  };

  empty = () => {};

  placeStart = p5 => {
    let index = this.calculateIndex(p5.mouseX, p5.mouseY);
    if (
      index[0] < this.mazeHeight &&
      index[0] >= 0 &&
      index[1] < this.mazeWidth &&
      index[1] >= 0
    ) {
      if (this.graph[index[0]][index[1]] === 0) {
        if (!this.startPlaced) {
          this.graph[index[0]][index[1]] = 1;
          this.colourBox(p5, index, [0, 0, 255]);
          this.startPlaced = true;
          this.startCoords = index;
        } else {
          // TODO: can make like a popup which says start has already been placed
        }
      } else if (this.startPlaced) {
        if (this.graph[index[0]][index[1]] === 1) {
          this.graph[index[0]][index[1]] = 0;
          this.colourBox(p5, index, 255);
          this.startPlaced = false;
          this.startCoords = [];
        }
      }
    }
    this.place = this.empty;
  };

  placeEnd = p5 => {
    let index = this.calculateIndex(p5.mouseX, p5.mouseY);
    if (
      index[0] < this.mazeHeight &&
      index[0] >= 0 &&
      index[1] < this.mazeWidth &&
      index[1] >= 0
    ) {
      if (this.graph[index[0]][index[1]] === 0) {
        if (!this.endPlaced) {
          this.graph[index[0]][index[1]] = 4;
          this.colourBox(p5, index, [0, 255, 255]);
          this.endPlaced = true;
          this.endCoords = index;

          // testing
          if (this.startPlaced) {
            let info = ShortestPathAlgorithms.BreadthFirstSearch(
              this.graph,
              this.startCoords,
              this.endCoords
            );
            this.props.getDistance(info.distance);
            console.log("order", info.traversalOrder);
            this.animateTraversalOrder(p5, info.traversalOrder);
            this.animateShortestPath(p5, info.shortestPath);
          }
          //
        } else {
          // TODO: can make like a popup which says start has already been placed
        }
      } else if (this.endPlaced) {
        if (this.graph[index[0]][index[1]] === 4) {
          this.graph[index[0]][index[1]] = 0;
          this.colourBox(p5, index, 255);
          this.endPlaced = false;
          this.endCoords = [];
        }
      }
    }
    this.place = this.empty;
  };

  placeMazeWall = p5 => {
    let index = this.calculateIndex(p5.mouseX, p5.mouseY);
    if (
      index[0] < this.mazeHeight &&
      index[0] >= 0 &&
      index[1] < this.mazeWidth &&
      index[1] >= 0
    ) {
      if (this.graph[index[0]][index[1]] === 0) {
        this.graph[index[0]][index[1]] = 2;
        this.colourBox(p5, index, 0);
      } else if (this.graph[index[0]][index[1]] === 2) {
        this.graph[index[0]][index[1]] = 0;
        this.colourBox(p5, index, 255);
      }
    }

    this.place = this.empty;
  };

  animateTraversalOrder = (p5, order) => {
    for (let i = 1; i < order.length - 1; i++) {
      setTimeout(() => {
        this.colourBox(p5, order[i], [255, 255, 0]);
      }, 0);
    }
  };
  animateShortestPath = (p5, shortestPath) => {
    for (let i = 1; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        this.colourBox(p5, shortestPath[i], [255, 0, 0]);
      }, 0);
    }
  };
  clearSketch = p5 => {
    p5.clear();
    this.initGrid(p5);
  };

  touchStarted = p5 => {
    // console.log("object", this.props.object);
    this.place = this.objectDraw[this.props.object];
  };
  draw = p5 => {
    this.place(p5);
    // console.log(this.props.returnClear());
    // if (this.props.returnClear()) {
    //   this.clearSketch(p5);
    // }
  };

  render = () => {
    return (
      <Sketch
        setup={this.setup}
        draw={this.draw}
        touchStarted={this.touchStarted}
      />
    );
  };
}
