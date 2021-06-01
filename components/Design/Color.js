import React, {useCallback, useState} from "react";
import {SketchPicker, SwatchesPicker} from "react-color";
import axioss from "axios";
import SizeChanger from "./SizeChanger";
import { RadioButton, Stack, Heading } from "@shopify/polaris";

const  Colors = (props) => {
  const [picker, setPicker] = useState("our")
  const changeColor =  (color) =>{
    props.setColor(color.hex)
      axioss.put(`https://cleverchoicetopbar-default-rtdb.firebaseio.com/${props.shop}/color.json`, {color:color}).then(res=>res)
  }
  const handleChange = useCallback(
    (_checked, newValue) => setPicker(newValue),
    [],
  );
  return (
    <div className="ColorContainer">
        <div className="ColorText">
          <Stack vertical>
            <Heading element="h1">Background Color</Heading>
            <RadioButton
              label="Custom Colors"
              checked={picker === 'our'}
              id="our"
              name="color"
              onChange={handleChange}
            />
            <RadioButton
              label="Colors"
              id="custom"
              name="color"
              checked={picker === 'custom'}
              onChange={handleChange}
            />
          </Stack>
          <SizeChanger shop = {props.shop} checked = {props.checked} setChecked={(newChecked)=>props.setChecked(newChecked)} value = {props.value} setValue = {(value)=>props.setValue(value)}/>
        </div>
        <div style={{height: '300px'}}>
          {picker === "our"?
            <SwatchesPicker
              onChange={changeColor}
              width={320}
              height={320}/>
            :<SketchPicker
              disableAlpha
              color = {props.color}
              onChangeComplete={ changeColor }
              width={300}
              height={300}
            />}
        </div>
    </div>

  );
}

export default Colors;
