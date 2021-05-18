import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import {RadioButton, Stack} from "@shopify/polaris";

const  SizeChanger = (props) => {

  useEffect(() => {
    axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/size.json").then(res=>console.log(res)).then(()=>{
      axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/size.json", {size :props.value}).then(res=>console.log(res))
    })
  }, [props.value]);

  const handleChange = useCallback(
    (_checked, newValue) => props.setValue(newValue),
    [],
  );

  return (
    <Stack vertical>
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
  );
}
export default SizeChanger;
