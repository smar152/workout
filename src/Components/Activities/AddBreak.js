import React from "react";

const AddBreak = ({ onAdd, nextIndex }) => (
  <>
    <div className="pointer mt-2 p-2" onClick={() => onAdd(nextIndex)}>
      <div className="addBreakLabel d-flex text-center m-0 p-0">
        <span className="addBreakTitle">Add Break</span>
      </div>
    </div>
  </>
);

export default AddBreak;
