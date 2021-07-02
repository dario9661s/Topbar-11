import React from "react";

import { Heading, ButtonGroup, RangeSlider, Stack } from "@shopify/polaris";

const FontSize = (props) => {
  return (
      <Stack vertical>
         <Heading element="h1">Letter Spacing</Heading>
         <ButtonGroup fullWidth segmented={true}  >
         <RangeSlider min = {1} max={5} value={props.design.letterSpacing.replace("px", "")} onChange={(value)=> props.setDesign({...props.design, letterSpacing : `${value}px`})} output />
          </ButtonGroup>
      </Stack>
  );
};
export default FontSize;
