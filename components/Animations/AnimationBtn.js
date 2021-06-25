import { Button} from "@shopify/polaris";

const  Animations = (props) => {
    let animation = null
    if(props.label === "None"){
        animation = "none"
    } else if (props.label === "Right-Left") {
        animation === "right"
    }else if (props.label === "Left-Right") {
        animation === "left"
    }else if (props.label === "Pulse") {
        animation === "pulse"
    }else if (props.label === "Vibration") {
        animation === "vibration"
    }

  return (
    <div >
        <Button fullWidth onClick={(animation)=>props.setAnimation(animation)}>{props.label}</Button>
    </div>
  );
}
export default Animations;
