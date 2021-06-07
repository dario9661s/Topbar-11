import {DataType} from "@shopify/shopify-api";

export async function postLink(client, link, linkText) {
  let namespace = 'cleverchoice';
  let key = 'topbar';
  if (!client) {
    console.error(
      "Could not make the rest request as the client does not exist"
    );
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  })
  // rateMetafields && console.log(rateMetafields)
  rateMetafields['body']['metafields'] && rateMetafields['body']['metafields'].forEach(metafield => {
    if(metafield['namespace'] === namespace && metafield['key'] === key){
      //appMetafield = metafield;
        let value = JSON.parse(metafield.value);
        value['link'] = link;
        value['linkText'] = linkText
        client.put({
          path: `metafields/${metafield.id}`,
          data : {
            "metafield": {
              "id": metafield.id,
              "value": JSON.stringify(value),
              "value_type": "json_string"
            }
          },
          type: DataType.JSON,
        })
    }
  })

  return "return";
}
