import React, { useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Heading, ButtonGroup, RangeSlider, Button, Stack } from "@shopify/polaris";

const FontSize = (props) => {
  return (
      <Stack vertical>
         <Heading element="h1">Font Size</Heading>
         <ButtonGroup fullWidth segmented={true}  >
         <RangeSlider min = {14} max={25} value={props.design.fontSize.replace("px", "")} onChange={(value)=> props.setDesign({...props.design, fontSize : `${value}px`})} output />
          </ButtonGroup>
      </Stack>
  );
};
export default FontSize;
