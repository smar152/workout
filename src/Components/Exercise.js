import React, { Component } from "react";
import AddWhite from "./svg/AddWhite";

export class Exercise extends Component {
  state = {
    addButtonVisible: false,
  };

  /**
   * Adds plus icon on hover
   */
  addPlusIcon() {
    this.setState({ addButtonVisible: true });
  }

  /**
   * Removes plus icon when hover ends
   */
  removePlusIcon() {
    this.setState({ addButtonVisible: false });
  }

  render() {
    const { onAdd, exercise } = this.props;
    return (
      <>
        <div
          className="exerciseThumbnail mt-3 d-flex rounded"
          onMouseEnter={() => this.addPlusIcon()}
          onMouseLeave={() => this.removePlusIcon()}
        >
          <p className="align-self-end m-2 font-weight-bolder">
            {" "}
            {exercise.name}
          </p>
          <div
            className="align-self-start ml-auto mt-2 mr-2 pointer"
            onClick={() => onAdd(exercise)}
          >
            {this.state.addButtonVisible && <AddWhite />}
          </div>
        </div>
      </>
    );
  }
}

export default Exercise;
