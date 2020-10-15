import React, { Component } from "react";
import Exercise from "./Exercise";
import AddBreakButton from "./AddBreakButton.js";

export class Content extends Component {
  state = {
    currentExercises: [],
    exercisesLabel: "Top Exercises",
  };

  /**
   * Calculates the 8 most popular exercises
   * to display when user hasn't searched for anything
   */
  findTopExercises() {
    this.findExercises({
      maxRecords: 8,
      view: "Grid view",
      sort: [{ field: "Uses", direction: "desc" }],
    });
  }

  /**
   * Searches for exercises based on user input
   * saves them in the state for display
   * @param {object} query
   */
  findExercises(query) {
    this.props
      .base("Exercises")
      .select(query)
      .eachPage(
        (records, fetchNextPage) => {
          const currentExercises = records.map((record) => ({
            name: record.get("Name"),
            sets: record.get("Sets"),
            reps: record.get("Repetition"),
            time: record.get("Duration"),
            rest: record.get("Rest Between (seconds)"),
          }));

          this.setState({ currentExercises });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }

  /**
   * Searches for exercises based on user input
   * @param {string} text
   */
  searchExercise(text) {
    const lcText = text.toLowerCase();

    if (!text) {
      this.setState({ exercisesLabel: "Top Exercises" });
      this.findTopExercises();
    } else {
      this.setState({ exercisesLabel: "Search Results" });
      this.props
        .base("Exercises")
        .select({
          maxRecords: 8,
          view: "Grid view",
          sort: [{ field: "Name", direction: "asc" }],
        })
        .eachPage(
          (records, fetchNextPage) => {
            const currentExercises = records
              .filter((exercise) =>
                exercise.get("Name").toLowerCase().match(lcText)
              )
              .map((record) => ({
                name: record.get("Name"),
                sets: record.get("Sets"),
                reps: record.get("Repetition"),
                time: record.get("Duration"),
                rest: record.get("Rest Between (seconds)"),
              }));

            this.setState({ currentExercises });

            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
    }
  }

  componentDidMount() {
    this.findTopExercises();
  }

  render(props) {
    return (
      <div className="content searchResults mt-2 mb-5 p-4" key="mainContent">
        <input
          type="text"
          placeholder="Search:"
          className="w-100 border-0 inputs p-4 mb-2"
          onChange={(e) => this.searchExercise(e.target.value)}
        />
        <AddBreakButton onAddBreak={this.props.onAddBreak} />
        <div className="mt-4">
          <h6>{this.state.exercisesLabel}</h6>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {this.state.currentExercises.map((exercise) => (
            <Exercise
              key={exercise.name}
              exercise={exercise}
              onAdd={this.props.onAdd}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Content;
