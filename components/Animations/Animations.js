import React, { useCallback, useEffect } from "react";
import {
  Card,
  Layout,
  Stack,
  Button,
  ButtonGroup,
  TextField,
} from "@shopify/polaris";
import AnimationBtn from "./AnimationBtn";

const Animations = (props) => {
  console.log(props.campaign);

  let animations = ["None", "Left-Right", "Right-Left"];
  if (props.campaign === "Announcment") {
    animations = ["None", "Pulse", "Vibrate"];
  }
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const triggerOncehandler = useCallback(() => {
    if (props.animationProps.animationTiming) return;
    props.setAnimationProps({ ...props.animationProps, animationTiming: true });
  }, [props.animationProps.animationTiming]);

  const triggerInfinitehandHandler = useCallback(() => {
    if (!props.animationProps.animationTiming) return;
    props.setAnimationProps({
      ...props.animationProps,
      animationTiming: false,
    });
  }, [props.animationProps.animationTiming]);
  console.log(props.animationProps.animation);

  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Animation Timing" sectioned>
          <Stack>
            <ButtonGroup segmented>
              <Button
                pressed={props.animationProps.animationTiming}
                onClick={triggerOncehandler}
              >
                Trigger Once
              </Button>
              <Button
                pressed={!props.animationProps.animationTiming}
                onClick={triggerInfinitehandHandler}
              >
                Infinite Loop
              </Button>
              {props.animationProps.animationTiming ? null : (
                <TextField
                  label="Quantity"
                  type="number"
                  value={"1"}
                  onChange={handleChange}
                />
              )}
            </ButtonGroup>
          </Stack>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card title="Animations" sectioned>
          <Stack vertical>
            {animations.map((animation, i) => {
              return (
                <AnimationBtn
                  key={i}
                  label={animation}
                  animationProps={props.animationProps}
                  setAnimationProps={(time) => props.setAnimationProps(time)}
                />
              );
            })}
          </Stack>
        </Card>
      </Layout.Section>
    </Layout>
  );
};
export default Animations;
