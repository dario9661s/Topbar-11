import React, {useCallback, useEffect} from "react";
import {Card, Layout, Stack, Button, ButtonGroup} from "@shopify/polaris";
import AnimationBtn from './AnimationBtn';

const  Animations = (props) => {
  useEffect(() => {
   
  }, [props.animation]);
  console.log(props.campaign);
  let animations = ["None", "Left-Right", "Right-Left"]
  if (props.campaign === "Announcment") {
    animations = ["None", "Pulse", "Vibrate"]
  }

  const triggerOncehandler = useCallback(() => {
    if (props.animationTiming) return;
    props.setAnimationTiming(true);
  }, [props.animationTiming]);

  const triggerInfinitehandHandler = useCallback(() => {
    if (!props.animationTiming) return;
    props.setAnimationTiming(false);
  }, [props.animationTiming]);
  console.log(props.animation);
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Order details" sectioned>
          <Stack>
          <ButtonGroup segmented>
            <Button pressed={props.animationTiming} onClick={triggerOncehandler}>
              First button
            </Button>
            <Button pressed={!props.animationTiming} onClick={triggerInfinitehandHandler}>
              Second button
            </Button>
        </ButtonGroup>
          </Stack>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card
          title= "Animations"
          sectioned
        >
          <Stack vertical>
            {animations.map((animation , i) => {
              return <AnimationBtn  key = {i} label = {animation}   setAnimation = {(time)=>props.setAnimation(time)}/>
            })}
          
          </Stack>
        </Card>
      </Layout.Section>
    </Layout>

  );
}
export default Animations;
