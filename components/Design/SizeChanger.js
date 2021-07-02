import React, {  useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Heading, Button, ButtonGroup, Stack, RangeSlider } from "@shopify/polaris";

const SizeChanger = (props) => {
  const [axios] = useAxios();
  useEffect(() => {
   
  }, [props.design.value]);
console.log(props.design.value);
  return (
      <Stack vertical>
         <Heading element="h1">Size</Heading>
         <RangeSlider min = {20} max={70} value={props.design.value.replace("px", "")} onChange={(value)=> props.setDesign({...props.design, value : `${value}px`})} output />
      </Stack>

  );
};
export default SizeChanger;
