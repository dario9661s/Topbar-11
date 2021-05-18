import React, {useCallback, useEffect, useState} from "react";
import {SketchPicker, SwatchesPicker} from "react-color";
import axioss from "axios";
import {
  Heading, RadioButton, Stack
} from "@shopify/polaris";
const  Colors = (props) => {
  const [picker, setPicker] = useState("our")

  useEffect(() => {
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json").then(res => {
      const color = Object.values(res.data)[0].color.hex
      props.setColor(color)
    })
  }, []);
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
  console.log(picker)
  return (
    <div className="ColorContainer">
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
      </div>
      {picker === "our"? <SwatchesPicker onChange={changeColor} height={306}/> :   <SketchPicker
        color = {props.color}
        onChangeComplete={ changeColor }
      />}
    </div>

  );
}

export default Colors;
