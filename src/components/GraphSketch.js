import React, { Component } from "react";
import Sketch from "react-p5";
const PathAlgorithms = require("./Path/Path");
const MazeAlgorithms = require("./Maze/Maze");

// TODO: change maze wall to maze wall on click and make a maze wall wrapper for i,j
// make a clear traversal which doesn't clear walls,start and end basically clears when free

// 0-> free
// 1-> start
// 2-> maze wall
// 3-> border wall
// 4-> end

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.objectDraw = {
      start: this.placeStartOnClick,
      end: this.placeEndOnClick,
      wall: this.placeMazeWallOnClick
    };
  }

  setup = (p5, canvasParentRef) => {
    this.width = p5.windowWidth * 0.9; //pixels
    this.height = p5.windowHeight * 0.9; //pixels
    this.mazeHeight = 61; //units
    this.mazeWidth = 121; //units
    this.mazeHeightUnit = this.height / this.mazeHeight; // pixels/unit
    this.mazeWidthUnit = this.width / this.mazeWidth; // pixels/unit
    p5.createCanvas(this.width, this.height).parent(canvasParentRef);
    this.initGrid(p5);
    // flags to reduce time complexities
    this.place = this.empty;
    this.startPlaced = false;
    this.startCoords = [];
    this.endPlaced = false;
    this.endCoords = [];
    this.animated = false;
    // p5.frameRate(1);
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

  placeStartOnClick = p5 => {
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

          if (this.endPlaced) {
            this.traversalInfo = PathAlgorithms[this.props.pathAlgorithm](
              this.graph,
              this.startCoords,
              this.endCoords
            );
          }
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

  placeEndOnClick = p5 => {
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
            this.traversalInfo = PathAlgorithms[this.props.pathAlgorithm](
              this.graph,
              this.startCoords,
              this.endCoords
            );
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

  placeMazeWall = (p5, index) => {
    if (this.graph[index[0]][index[1]] === 0) {
      this.graph[index[0]][index[1]] = 2;
      this.colourBox(p5, index, 0);
    } else if (this.graph[index[0]][index[1]] === 2) {
      this.graph[index[0]][index[1]] = 0;
      this.colourBox(p5, index, 255);
    }
  };

  placeMazeWallOnClick = p5 => {
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
    if (this.startPlaced && this.endPlaced) {
      this.traversalInfo = PathAlgorithms[this.props.pathAlgorithm](
        this.graph,
        this.startCoords,
        this.endCoords
      );
    }

    this.place = this.empty;
  };

  animatePath = (p5, order) => {
    var colour = [
      Math.floor(Math.random() * 255 + 0),
      Math.floor(Math.random() * 255 + 0),
      Math.floor(Math.random() * 255 + 0)
    ];
    p5.frameRate(1);
    for (let i = 1; i < order.length - 1; i++) {
      setTimeout(() => {
        this.colourBox(p5, order[i], colour);
      }, 0);
    }
    p5.frameRate(10);
  };

  animateMazeWalls = (p5, order) => {
    this.clearSketch(p5);
    for (let i = 0; i < order.length; i++) {
      setTimeout(() => {
        this.placeMazeWall(p5, order[i]);
      }, 0);
    }
  };

  clearAnimation = p5 => {
    for (let i = 0; i < this.graph.length; i++) {
      for (let j = 0; j < this.graph[0].length; j++) {
        if (this.graph[i][j] == 0) {
          this.colourBox(p5, [i, j], 255);
        }
      }
    }
    this.animated = false;
  };

  clearSketch = p5 => {
    this.initGrid(p5);
    this.startPlaced = false;
    this.startCoords = [];
    this.endPlaced = false;
    this.endCoords = [];
    this.animated = false;
  };

  touchStarted = p5 => {
    this.place = this.objectDraw[this.props.object];
  };
  draw = p5 => {
    this.place(p5);

    if (this.props.returnClear()) {
      console.log("clearing");
      this.clearSketch(p5);
    }
    if (this.props.returnFindPath()) {
      if (this.animated) {
        this.clearAnimation(p5);
      }

      if (this.startPlaced && this.endPlaced) {
        this.animatePath(p5, this.traversalInfo.traversalOrder);
        this.animatePath(p5, this.traversalInfo.shortestPath);
        this.props.getDistance(this.traversalInfo.distance);
        this.animated = true;
      } else {
        // TODO: something which says start and end haven't been placed
      }
    }

    if (this.props.returnGenerateMaze()) {
      console.log("making maze");
      let mazeOrder = MazeAlgorithms[this.props.mazeAlgorithm](this.graph);
      console.log("mazeorder", mazeOrder);
      this.animateMazeWalls(p5, mazeOrder);
    }
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