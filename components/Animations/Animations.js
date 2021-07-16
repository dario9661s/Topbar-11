import React, { useCallback } from "react";
import { Card, Layout, Stack, Button, RangeSlider } from "@shopify/polaris";
import AnimationBtn from "./AnimationBtn";
import { useAxios } from "../../hooks/useAxios";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const Animations = (props) => {
  const [axios] = useAxios();
  let animations = ["None", "Left-Right", "Right-Left", "Pulse", "Vibrate"];
  if (props.campaign === "Announcment") {
    animations = ["None", "Pulse", "Vibrate"];
  }
  const sendAnimation = () => {
    axios
      .put(
        `https://massive-frog-5.loca.lt/animation/anim?animation=${props.animationProps.animation}&animationSecounds=${props.animationProps.animationSecounds}&animationTiming=${props.animationProps.animationTiming}`
      )
      .then((res) => res);
  };
  console.log(props.animationProps);
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Animation Timing" sectioned>
          <Stack vertical distribution="fill">
            <Stack
              alignment="center"
              distribution="center"
              spacing="extraLoose"
              fullWidth
            >
              <div
                className="Icons"
                onClick={() =>
                  props.setAnimationProps({
                    ...props.animationProps,
                    animationTiming: "Repeat",
                  })
                }
              >
                {" "}
                <RotateLeftIcon
                  color={
                    props.animationProps.animationTiming === "Repeat"
                      ? "primary"
                      : "disabled"
                  }
                />
              </div>
              <div
                className="Icons"
                onClick={() =>
                  props.setAnimationProps({
                    ...props.animationProps,
                    animationTiming: "Once",
                  })
                }
              >
                <RepeatOneIcon
                  color={
                    props.animationProps.animationTiming === "Once"
                      ? "primary"
                      : "disabled"
                  }
                />
              </div>
            </Stack>
            <RangeSlider
              label="Scounds"
              min={7}
              max={12}
              value={props.animationProps.animationSecounds}
              onChange={(value) =>
                props.setAnimationProps({
                  ...props.animationProps,
                  animationSecounds: value,
                })
              }
              output
            />
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
            <Button primary onClick={() => sendAnimation()}>
              Save Changes!
            </Button>
          </Stack>
        </Card>
      </Layout.Section>
    </Layout>
  );
};
export default Animations;
