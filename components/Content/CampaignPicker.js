import React from "react";
import { Stack } from "@shopify/polaris";
import CheckIcon from '@material-ui/icons/Check';

export default function SimpleListMenu(props) {

  const handleSelectChange = (btn)=>{
     props.setCampaign(btn)
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
        return <div key={i}  className={props.campaign === btn.value? "CampaignBtnActive" : "CampaignBtn" } onClick={()=>handleSelectChange(btn.value)}>
          {btn.label}
          {props.campaign === btn.value? <CheckIcon/> : null}
        </div>
      })}
    </Stack>
  );
}
