import React from "react";

import { Heading, ButtonGroup, Button, Stack,  } from "@shopify/polaris";

const FontColor = (props) => {


  return (
      <Stack vertical>
      <Heading element="h1">Font</Heading>
        <Stack vertical>
            <p onClick = {()=>props.setDesign({...props.design, fontStyle:"Roboto"})}>Roboto</p>
            <p style={{fontFamily:"Open Sans"}}  onClick = {()=>props.setDesign({...props.design, fontStyle:"Open Sans"})}>Open Sans</p>
            <p style={{fontFamily:"Poppins"}}  onClick = {()=>props.setDesign({...props.design, fontStyle:"Poppins"})}>Poppins</p>
            <p style={{fontFamily:"Mukta"}}  onClick = {()=>props.setDesign({...props.design, fontStyle:"Mukta"})}>Mukta</p>
        </Stack>
      </Stack>
  );
};
export default FontColor;
