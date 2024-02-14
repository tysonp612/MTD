import React, { useState } from "react";
import { Slider } from "antd";

export const SliderComponent = ({ input, renderProductFromSlider }) => {
  const { min, max, defaultValue } = input;

  const handleChangeValue = (e) => {
    renderProductFromSlider(e);
  };

  return (
    <>
      <Slider
        range
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={(e) => {
          handleChangeValue(e);
        }}
      />
    </>
  );
};
