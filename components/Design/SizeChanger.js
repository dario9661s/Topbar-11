import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import {Checkbox, Heading, RadioButton, Stack} from "@shopify/polaris";

const  SizeChanger = (props) => {
  useEffect(() => {
      axioss.put(`https://cleverchoicetopbar-default-rtdb.firebaseio.com/${props.shop}/size.json`, {size :props.value}).then(res=>console.log(res))
  }, [props.value]);
  const handleChange = useCallback(
    (_checked, newValue) => props.setValue(newValue),
    [],
  );
  return (
    <div style={{marginTop:"30px"}}>
      <Heading element="h1">Size</Heading>
      <div style={{marginTop:"10px"}}></div>
      <Stack>
        <RadioButton
          label="Large"
          checked={props.value === '50px'}
          id="50px"
          name="size"
          onChange={handleChange}
        />
        <RadioButton
          label="Medium"
          id="30px"
          name="size"
          checked={props.value === '30px'}
          onChange={handleChange}
        />
        <RadioButton
          label="Small"
          id="20px"
          name="accounts"
          checked={props.value === '20px'}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
export default SizeChanger;
