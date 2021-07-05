import React from "react";
import { Stack, Button } from "@shopify/polaris";
import CheckIcon from '@material-ui/icons/Check';

export default function SimpleListMenu(props) {

  const handleSelectChange = (btn)=>{
     props.setCampaign(btn)
     props.setAnimationProps({
      animation: "",
      animationSecounds: ""
     })
     props.setDesign({...props.design, icon:"none"})
  }

  const options = [
    { label: "Link", value: "Link" },
    { label: "Shipping", value: "Shipping" },
    { label: "Announcement", value: "Announcment" },
    { label: "Count Down Timer", value: "CountDown" },
  ];

  return (
    <Stack vertical={true}>
      {options.map((btn,i)=> {
        return <Button key={i}  fullWidth pressed={props.campaign === btn.value? true : false } onClick={()=>handleSelectChange(btn.value)}>
          {btn.label}
        </Button>
      })}
    </Stack>
  );
}
