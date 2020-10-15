import React from "react";

const AddBlue = (props) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <title>Add Break</title>

    <defs>
      <path
        d="M645,385 C650.522847,385 655,389.477153 655,395 C655,400.522847 650.522847,405 645,405 C639.477153,405 635,400.522847 635,395 C635,389.477153 639.477153,385 645,385 Z M645,389.5 L644.85554,389.506867 L644.714965,389.527047 C644.022851,389.660188 643.5,390.269035 643.5,391 L643.5,391 L643.5,393.5 L641,393.5 L640.85554,393.506867 C640.094888,393.579551 639.5,394.220304 639.5,395 L639.5,395 L639.506867,395.14446 C639.579551,395.905112 640.220304,396.5 641,396.5 L641,396.5 L643.5,396.5 L643.5,399 L643.506867,399.14446 C643.579551,399.905112 644.220304,400.5 645,400.5 L645,400.5 L645.14446,400.493133 C645.905112,400.420449 646.5,399.779696 646.5,399 L646.5,399 L646.5,396.5 L649,396.5 L649.14446,396.493133 C649.905112,396.420449 650.5,395.779696 650.5,395 L650.5,395 L650.493133,394.85554 C650.420449,394.094888 649.779696,393.5 649,393.5 L649,393.5 L646.5,393.5 L646.5,391 L646.493133,390.85554 C646.420449,390.094888 645.779696,389.5 645,389.5 L645,389.5 Z"
        id="path-1"
      ></path>
      <filter
        x="-10.0%"
        y="-10.0%"
        width="120.0%"
        height="120.0%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feGaussianBlur
          stdDeviation="1.5"
          in="SourceAlpha"
          result="shadowBlurInner1"
        ></feGaussianBlur>
        <feOffset
          dx="0"
          dy="1"
          in="shadowBlurInner1"
          result="shadowOffsetInner1"
        ></feOffset>
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
          result="shadowInnerInner1"
        ></feComposite>
        <feColorMatrix
          values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.2 0"
          type="matrix"
          in="shadowInnerInner1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g id="Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Customization" transform="translate(-635.000000, -385.000000)">
        <g id="Combined-Shape">
          <use
            fill="#1979FF"
            fillRule="evenodd"
            xlink="true"
            href="#path-1"
          ></use>
          <use
            fill="black"
            fillOpacity="1"
            filter="url(#filter-2)"
            xlink="true"
            href="#path-1"
          ></use>
        </g>
      </g>
    </g>
  </svg>
);

export default AddBlue;
