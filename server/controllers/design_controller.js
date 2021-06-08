import {DataType} from "@shopify/shopify-api";
let namespace = 'cleverchoice';
let key = 'topbar';
function msg () {
  console.error(
    "Could not make the rest request as the client does not exist!"
  );
}


export async function postColor(client, color) {
  if (!client) {
    msg()
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  })
  rateMetafields['body']['metafields'] && rateMetafields['body']['metafields'].forEach(metafield => {
    if(metafield['namespace'] === namespace && metafield['key'] === key){
      let value = JSON.parse(metafield.value);
      const picked = (({ rates }) => ({ rates }))(value)
      picked['design']['color'] = color
      console.log(picked)
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(picked),
            "value_type": "json_string"
          }
        },
        type: DataType.JSON,
      })
    }
  })
  return "return";
}
