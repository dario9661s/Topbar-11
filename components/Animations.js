import React, {useCallback} from "react";
import { Heading, RadioButton, Stack} from "@shopify/polaris";

const  Animations = (props) => {
  const handleChange = useCallback(
    (_checked, newValue) => props.setChecked(newValue),
    [],
  );
  return (
    <div className="ColorContainer">
      <Stack vertical>
        <Heading element="h1">Animations</Heading>
        <RadioButton
          label="Left-Right"
          checked={props.checked === 'left'}
          id="left"
          name="size"
          onChange={handleChange}
        />
        <RadioButton
          label="Right-Left"
          id="right"
          name="size"
          checked={props.checked === 'right'}
          onChange={handleChange}
        />
        <RadioButton
          label="None"
          id="none"
          name="size"
          checked={props.checked === 'none'}
          onChange={handleChange}
        />
      </Stack>
    </div>

  );
}
export default Animations;
