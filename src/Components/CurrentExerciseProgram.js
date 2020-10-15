import React, { Component } from "react";
import ExerciseDetails from "./Activities/ExerciseDetails";
import AddBreak from "./Activities/AddBreak";
import Break from "./Activities/Break";

const CurrentExerciseProgram = ({
  exerciseProgram,
  onDeleteExercise,
  onDeleteBreak,
  onAddBreak,
}) => (
  <div className="content currentExerciseProgram align-self-start mb-5">
    {exerciseProgram.map((item, index) => {
      if (item.type === "exercise") {
        return (
          <div key={index}>
            <div className="exerciseDetails m-2 mb-4" key={index}>
              <ExerciseDetails
                key={index}
                index={index}
                exercise={item}
                onDeleteExercise={() => onDeleteExercise(index)}
              />
            </div>
            {index !== exerciseProgram.length - 1 &&
              exerciseProgram[index + 1].type === "exercise" && (
                <AddBreak
                  nextIndex={index + 1}
                  onAdd={onAddBreak}
                  onDelete={() => onDeleteBreak(index)}
                />
              )}
          </div>
        );
      } else if (item.type === "break") {
        return (
          <Break
            onDelete={() => onDeleteBreak(index)}
            key={index}
            index={index}
          />
        );
      }
    })}
  </div>
);

export default CurrentExerciseProgram;
