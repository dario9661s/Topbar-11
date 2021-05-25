import React, {useEffect, useCallback} from 'react';
import {Select} from "@shopify/polaris";
import axioss from "axios";



export default function SimpleListMenu(props) {


  const handleSelectChange = useCallback((value) => props.setCampaign(value), []);

  useEffect(() => {
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json").then(res=>{
      if(res.data){
        props.setCampaign("Shipping")
      }else {
        props.setCampaign("Announcment")
      }
    })
  }, []);

  const options = [
    {label: 'Shipping', value: 'Shipping'},
    {label: 'Announcment', value: 'Announcment'},
  ];

  return (
    <div className="SelectCampaignContainer">
      <Select
        label="Select Campaign"
        options={options}
        onChange={handleSelectChange}
        value={props.campaign}
      />
    </div>
  );
}
