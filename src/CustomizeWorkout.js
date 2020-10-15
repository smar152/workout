import React, { Component } from "react";
import Content from "./Components/Content";
import CurrentExerciseProgram from "./Components/CurrentExerciseProgram";
import "./fonts.css";
import Airtable from "airtable";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class CustomizeWorkout extends Component {
  state = {
    currentProgram: [],
    totalTime: 0,
    workoutName: "",
  };

  constructor(props) {
    super(props);
    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      apiKey: "keylodn7FgWffa90i",
    });
    this.base = Airtable.base("appCUVYjYyYPP2KdR");
  }

  /**
   * Adds an exercise to the current workout program
   * @param {object} exercise
   */
  addExerciseToList = (exercise) => {
    let formatedExercise = { type: "exercise", data: exercise };
    let newList = [...this.state.currentProgram, formatedExercise];
    let exerciseMinutes = Number(exercise.time.replace(/[^0-9]/g, ""));
    this.setState({
      currentProgram: newList,
      totalTime: this.state.totalTime + exerciseMinutes,
    });
  };

  /**
   * Removes an exercise from the current workout program
   * @param {number} indexToRemove
   */
  removeExerciseFromList = (indexToRemove) => {
    let exercise = this.state.currentProgram[indexToRemove].data;
    let newList = this.state.currentProgram.filter(
      (exercise, index) => index != indexToRemove
    );
    let exerciseMinutes = Number(exercise.time.replace(/[^0-9]/g, ""));
    this.setState({
      currentProgram: newList,
      totalTime: this.state.totalTime - exerciseMinutes,
    });
  };

  /**
   * Adds a break to a specific index of the the current workout program
   * @param {number} index
   */
  addBreakTolist = (index) => {
    let rest = { type: "break" };
    let newList = [...this.state.currentProgram];
    newList.splice(index, 0, rest);
    this.setState({
      currentProgram: newList,
      totalTime: this.state.totalTime + 5,
    });
  };

  /**
   * Removes a break from a specific index of the current workout program
   * @param {number} indexToRemove
   */
  removeBreakFromList = (indexToRemove) => {
    let newList = this.state.currentProgram.filter(
      (exercise, index) => index != indexToRemove
    );
    this.setState({
      currentProgram: newList,
      totalTime: this.state.totalTime - 5,
    });
  };

  /**
   * Calculates the index of the current workout program
   */
  calculateWorkoutNo = () => {
    return new Promise((resolve, reject) => {
      const query = {
        maxRecords: 1,
        view: "Grid view",
        sort: [{ field: "no", direction: "desc" }],
      };

      this.base("Workout Exercises")
        .select(query)
        .eachPage(
          (records, fetchNextPage) => {
            const no = records.map((record) => ({
              no: record.get("no"),
            }));

            const currentWorkoutNumber = Number(no[0].no) + 1;
            resolve({ currentWorkoutNumber });
          },
          function done(err) {
            if (err) {
              reject(err);
              console.error(err);
              return;
            }
          }
        );
    });
  };

  /**
   * Saves the current workout program to the airtable base
   */
  saveProgram = () => {
    this.calculateWorkoutNo()
      .then(({ currentWorkoutNumber }) => {
        this.state.currentProgram.forEach((item) => {
          if (item.type === "exercise") {
            this.base("Workout Exercises").create([
              {
                fields: {
                  Notes: item.data.name,
                  no: currentWorkoutNumber,
                  Workout: this.state.workoutName,
                },
              },
            ]);
          } else {
            this.base("Workout Exercises").create([
              {
                fields: {
                  Notes: "Break",
                  no: currentWorkoutNumber,
                  Workout: this.state.workoutName,
                },
              },
            ]);
          }
        });
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };

  /**
   * Is called when the user drops an exercise to a new position
   * Changes the index of an exercise in the current workout program
   * @param {object} result
   */
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // exits if the user drops the exercise in an unacceptable position
    if (!destination) {
      return;
    }

    // exits if the user drops the exercise in the same position it was dragged from
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // changes the index of the exercise in the current workout program
    const newCurrentProgram = Array.from(this.state.currentProgram);
    let itemArray = newCurrentProgram.splice(source.index, 1);
    newCurrentProgram.splice(destination.index, 0, itemArray[0]);

    this.setState({ currentProgram: newCurrentProgram });
  };

  /**
   * Changes the name of the current workout program
   * @param {string} workoutName
   */
  changeWorkoutName = (workoutName) => {
    this.setState({ workoutName });
  };

  render() {
    return (
      <>
        <div className="container mt-4 p-0 ">
          <div className="d-flex flex-row">
            <h4 className="title font-weight-light">
              <span className="font-weight-bolder">Customize</span> your workout
            </h4>
          </div>

          <div className="d-flex flex-row justify-content-between mt-4">
            <input
              type="text"
              className="titleInput inputs p-4 "
              placeholder="Workout name"
              onChange={(e) => this.changeWorkoutName(e.target.value)}
            />
            <div className="d-inline-flex align-items-center">
              <div className="totalTime align-self-center font-weight-light">
                Total time{" "}
                <span className="font-weight-bolder">
                  {this.state.totalTime} m
                </span>
              </div>

              <button
                className="btn btn-outline-primary ml-3 pl-4 pr-4 saveButton font-weight-bold"
                onClick={() => this.saveProgram()}
              >
                Save
              </button>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between align-items-start mt-3">
            {this.base && (
              <>
                <Content
                  base={this.base}
                  onAdd={this.addExerciseToList}
                  onAddBreak={() =>
                    this.addBreakTolist(this.state.currentProgram.length)
                  }
                />
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="currentProgram">
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <CurrentExerciseProgram
                            exerciseProgram={this.state.currentProgram}
                            onDeleteExercise={this.removeExerciseFromList}
                            onAddBreak={this.addBreakTolist}
                            onDeleteBreak={this.removeBreakFromList}
                            key="currentExerciseProgram"
                          >
                            {provided.placeholder}
                          </CurrentExerciseProgram>
                        </div>
                      );
                    }}
                  </Droppable>
                </DragDropContext>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CustomizeWorkout;
