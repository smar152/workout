import React, { Component } from "react";
import Drag from "../svg/Drag";
import Delete from "../svg/Delete";

class CardLayout extends Component {
  state = {
    deleteButtonVisible: false,
  };

  /**
   * Adds delete icon on hover
   */
  addDeleteIcon() {
    this.setState({ deleteButtonVisible: true });
  }
  /**
   * Removes delete icon when hover ends
   */
  removeDeleteIcon() {
    this.setState({ deleteButtonVisible: false });
  }

  /**
   * Deletes card when delete icon is clicked
   * @param {function} deleteBreak
   * @param {function} deleteExercise
   */
  deleteCard(deleteBreak, deleteExercise) {
    if (this.props.headerRight) {
      deleteBreak();
    } else {
      deleteExercise();
    }
  }

  render(props) {
    const {
      headerLeft,
      headerRight,
      mainContent,
      onDelete,
      onDeleteExercise,
    } = this.props;
    return (
      <div
        className="p-3 pt-2"
        onMouseEnter={() => this.addDeleteIcon()}
        onMouseLeave={() => this.removeDeleteIcon()}
      >
        <div className="d-flex flex-row">
          <div className="align-self-end p-1">
            <Drag />
          </div>
          <h5 className="ml-2 align-self-end mb-0 p-1 font-weight-bold">
            {headerLeft}
          </h5>
          <div className="breakDuration ml-1 align-self-end p-1">
            {headerRight}
          </div>
          <div
            className="pointer ml-auto mt-2 mr-2"
            onClick={() => this.deleteCard(onDelete, onDeleteExercise)}
          >
            {this.state.deleteButtonVisible && <Delete />}
          </div>
        </div>

        <div>{mainContent}</div>
      </div>
    );
  }
}

export default CardLayout;
