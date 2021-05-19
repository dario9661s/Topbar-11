import React, {useCallback, useEffect, useState} from "react";
import {SketchPicker, SwatchesPicker} from "react-color";
import axioss from "axios";
import SizeChanger from "./SizeChanger";
import {
  Heading, RadioButton, Stack
} from "@shopify/polaris";
const  Colors = (props) => {
  const [picker, setPicker] = useState("our")

  // useEffect(() => {
  //   axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json").then(res => {
  //     const color = Object.values(res.data)[0].color.hex
  //     props.setColor(color)
  //   })
  // }, []);
  const changeColor =  (color) =>{
    console.log(color)
    props.setColor(color.hex)
    axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json").then(res=>console.log(res)).then(()=>{
      axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json", {color:color}).then(res=>console.log(res))
    })
  }
  const handleChange = useCallback(
    (_checked, newValue) => setPicker(newValue),
    [],
  );


  return (
    <div className="ColorContainer">
      <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
        <div className="ColorText">
          <Heading element="h1">Background Color</Heading>
          <Stack vertical>
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
          <SizeChanger checked = {props.checked} setChecked={(newChecked)=>props.setChecked(newChecked)} value = {props.value} setValue = {(value)=>props.setValue(value)}/>
        </div>
        <div style={{height: '300px'}}>
          {picker === "our"? <SwatchesPicker  onChange={changeColor}
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
    </div>

  );
}

export default Colors;
