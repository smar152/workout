import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardLayout from "./CardLayout";
import nextId from "react-id-generator";

const Break = ({ index, breakAdded, onDelete }) => {
  const [id, setId] = useState(nextId());
  return (
    <>
      <Draggable draggableId={id} index={index} key={index}>
        {(provided) => {
          return (
            <div className="exerciseDetails m-2 mb-4">
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <CardLayout
                  headerLeft="Break"
                  headerRight="5 min"
                  mainContent={null}
                  breakAdded={breakAdded}
                  onDelete={onDelete}
                />
              </div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
};

export default Break;
