import React, {useCallback} from "react";
import {Card, Layout, RadioButton, Stack, Button} from "@shopify/polaris";


const  Animations = (props) => {

  const handleChange = useCallback(
    (_checked, newValue) => props.setChecked(newValue),
    [],
  );
  console.log(props.checked)
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Order details" sectioned>
          <Stack>
            <Button>Loop</Button>
            <Button>One time trigger</Button>
          </Stack>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card
          title= "Animations"
          sectioned
        >
          <Stack vertical>
            <RadioButton
              label="None"
              id="none"
              name="size"
              checked={props.checked === 'none'}
              onChange={handleChange}
            />
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
              label="Pulse"
              id="pulse"
              name="size"
              checked={props.checked === 'pulse'}
              onChange={handleChange}
            />
            <RadioButton
              label="Vibrate"
              id="vibrate"
              name="size"
              checked={props.checked === 'vibrate'}
              onChange={handleChange}
            />
            <RadioButton
              label="Jello"
              id="jello"
              name="size"
              checked={props.checked === 'jello'}
              onChange={handleChange}
            />
          </Stack>
        </Card>
      </Layout.Section>
    </Layout>

  );
}
export default Animations;
