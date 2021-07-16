import { Button } from "@shopify/polaris";

const Animations = (props) => {
  let anim = null;
  if (props.label === "None") {
    anim = "none";
  } else if (props.label === "Right-Left") {
    anim === "right";
  } else if (props.label === "Left-Right") {
    anim === "left";
  } else if (props.label === "Pulse") {
    anim === "pulse";
  } else if (props.label === "Vibration") {
    anim === "vibration";
  }

  return (
    <div>
      <Button
        disabled={props.animationProps.animation === props.label ? true : false}
        fullWidth
        onClick={() =>
          props.setAnimationProps({
            ...props.animationProps,
            animation: props.label,
          })
        }
      >
        {props.label}
      </Button>
    </div>
  );
};
export default Animations;
