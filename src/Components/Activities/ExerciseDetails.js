import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardLayout from "./CardLayout";
import nextId from "react-id-generator";

const MetadataItem = ({ title, children }) => {
  return (
    <div className="stats d-flex flex-column text-center">
      <h6>{title}</h6>
      <p className="font-weight-bolder">{children}</p>
    </div>
  );
};

const ExerciseDetails = ({ exercise, index, onDeleteExercise }) => {
  const [id, setId] = useState(nextId());
  const [deleteButtonVisible, setDeleteButtonVisibility] = useState(false);
  let exerciseData = exercise.data;
  return (
    <Draggable draggableId={id} index={index} key={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardLayout
              onDeleteExercise={onDeleteExercise}
              headerLeft={exerciseData.name}
              headerRight={null}
              mainContent={
                <div className=" mt-3 d-flex flex-row justify-content-between">
                  <MetadataItem title="SETS">{exerciseData.sets}</MetadataItem>
                  <MetadataItem title="REPS">{exerciseData.reps}</MetadataItem>
                  <MetadataItem title="TIME">{exerciseData.time}</MetadataItem>
                  <MetadataItem title="REST">
                    {exerciseData.rest && `${exerciseData.rest}'`}
                  </MetadataItem>
                </div>
              }
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default ExerciseDetails;
