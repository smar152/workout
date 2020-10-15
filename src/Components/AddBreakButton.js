import React, { Component } from "react";
import Break from "./svg/Break";
import AddBlue from "./svg/AddBlue";

const AddBreakButton = ({ onAddBreak }) => (
  <div>
    <button
      onClick={onAddBreak}
      className="addBreakButton font-weight-bold d-flex flex-row align-items-center justify-content-between p-4 w-100 mt-2 mb-2"
    >
      <Break />
      Add Break
      <AddBlue />
    </button>
  </div>
);

export default AddBreakButton;
