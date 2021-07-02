import React from "react";
import { Heading, ButtonGroup, Button, Stack } from "@shopify/polaris";

const Italic = (props) => {

  return (
      <Stack vertical>
      <Heading element="h1">Font Color</Heading>
      <ButtonGroup fullWidth segmented={true}  >
                <Button pressed={props.design.italic ==="normal"? true : false} onClick = {()=>props.setDesign({...props.design, italic:"normal"})}>Normal</Button>
                <Button pressed={props.design.italic ==="italic"? true : false} onClick = {()=>props.setDesign({...props.design, italic:"italic"})}>Italic</Button>
              </ButtonGroup>
      </Stack>
  );
};
export default Italic;
