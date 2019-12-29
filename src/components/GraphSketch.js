import React, { Component } from "react";
import Sketch from "react-p5";

import PathAlgorithms from "./Path/Path";
import MazeAlgorithms from "./Maze/Maze";

// 0-> free
// 1-> start
// 2-> maze wall
// 3-> border wall
// 4-> end
// 5-> weighted node

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.objectDraw = {
      start: this.placeStartOnClick,
      end: this.placeEndOnClick,
      wall: this.placeMazeWallOnClick,
      weight: this.placeWeightOnClick,
      none: this.empty
    };
  }

  setup = (p5, canvasParentRef) => {
    this.width = p5.windowWidth * 1; //pixels
    this.height = p5.windowHeight * 0.89; //pixels
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
    this.iPrev = 0;
    this.jPrev = 0;
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
          p5.fill(47, 56, 56);
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
          this.colourBox(p5, index, [0, 203, 255]);
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
          this.colourBox(p5, index, [255, 25, 33]);
          this.endPlaced = true;
          this.endCoords = index;
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
      this.colourBox(p5, index, [47, 56, 56]);
    } else if (this.graph[index[0]][index[1]] === 2) {
      this.graph[index[0]][index[1]] = 0;
      this.colourBox(p5, index, 255);
    }
  };

  placeMazeWallOnClick = p5 => {
    let index = this.calculateIndex(p5.mouseX, p5.mouseY);
    console.log("i,j prev", this.iPrev, this.jPrev);
    if (
      index[0] < this.mazeHeight &&
      index[0] >= 0 &&
      index[1] < this.mazeWidth &&
      index[1] >= 0
    ) {
      if (this.graph[index[0]][index[1]] === 0) {
        this.graph[index[0]][index[1]] = 2;
        this.colourBox(p5, index, [47, 56, 56]);
      } else if (this.graph[index[0]][index[1]] === 2) {
        this.graph[index[0]][index[1]] = 0;
        this.colourBox(p5, index, 255);
      }
    }

    this.place = this.empty;
  };

  placeWeightOnClick = p5 => {
    let index = this.calculateIndex(p5.mouseX, p5.mouseY);
    console.log("i,j prev", this.iPrev, this.jPrev);
    if (
      index[0] < this.mazeHeight &&
      index[0] >= 0 &&
      index[1] < this.mazeWidth &&
      index[1] >= 0
    ) {
      if (this.graph[index[0]][index[1]] === 0) {
        this.graph[index[0]][index[1]] = 5;
        this.colourBox(p5, index, [255, 0, 255]);
      } else if (this.graph[index[0]][index[1]] === 5) {
        this.graph[index[0]][index[1]] = 0;
        this.colourBox(p5, index, 255);
      }
    }

    this.place = this.empty;
  };

  animateExploration = (p5, order, colour1, colour2) => {
    p5.frameRate(1);
    for (let i = 1; i < order.length - 1; i++) {
      setTimeout(() => {
        if (this.graph[order[i][0]][order[i][1]] === 0) {
          this.colourBox(p5, order[i], colour1);
        } else {
          this.colourBox(p5, order[i], colour2);
        }
      }, 0);
    }
    p5.frameRate(10);
  };

  animatePath = (p5, order, colour) => {
    if (!colour) {
      colour = [
        Math.floor(Math.random() * 255 + 0),
        Math.floor(Math.random() * 255 + 0),
        Math.floor(Math.random() * 255 + 0)
      ];
    }

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
        if (this.graph[i][j] === 0) {
          this.colourBox(p5, [i, j], 255);
        }
        if (this.graph[i][j] === 5) {
          this.colourBox(p5, [i, j], [255, 0, 255]);
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
      // console.log("clearing");
      this.clearSketch(p5);
    }
    if (this.props.returnClearAnimation()) {
      this.clearAnimation(p5);
    }
    if (this.props.returnFindPath()) {
      if (this.animated) {
        this.clearAnimation(p5);
      }

      if (this.startPlaced && this.endPlaced) {
        this.traversalInfo = PathAlgorithms[this.props.pathAlgorithm](
          this.graph,
          this.startCoords,
          this.endCoords
        );
        if (this.traversalInfo) {
          this.animateExploration(
            p5,
            this.traversalInfo.traversalOrder,
            [49, 233, 129],
            [30, 200, 100]
          );
          this.animateExploration(
            p5,
            this.traversalInfo.shortestPath,
            [255, 213, 60],
            [180, 150, 40]
          );
          this.props.getDistance(this.traversalInfo.distance);
          this.animated = true;
        }
      } else {
        // TODO: something which says start and end haven't been placed
      }
    }

    if (this.props.returnGenerateMaze()) {
      console.log("making maze");
      let mazeOrder = MazeAlgorithms[this.props.mazeAlgorithm](this.graph);
      console.log("mazeorder", mazeOrder);
      if (mazeOrder) {
        this.animateMazeWalls(p5, mazeOrder);
      }
    }
  };

  render = () => {
    return (
      <div>
        <Sketch
          setup={this.setup}
          draw={this.draw}
          touchStarted={this.touchStarted}
          className="sketch"
        />
      </div>
    );
  };
}
