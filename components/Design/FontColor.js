import React from "react";

import { Heading, ButtonGroup, Button, Stack } from "@shopify/polaris";

const FontColor = (props) => {


  return (
      <Stack vertical>
      <Heading element="h1">Font Color</Heading>
      <ButtonGroup fullWidth segmented={true}  >
          <Button pressed={props.design.fontColor ==="black"? true : false} onClick = {()=>props.setDesign({...props.design, fontColor:"black"})}>Black</Button>
          <Button pressed={props.design.fontColor ==="white"? true : false} onClick = {()=>props.setDesign({...props.design, fontColor:"white"})}>White</Button>
      </ButtonGroup>
      </Stack>
  );
};
export default FontColor;
