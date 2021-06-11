import { DataType } from "@shopify/shopify-api";
let namespace = "cleverchoice";
let key = "topbar";
function msg() {
  console.error(
    "Could not make the rest request as the client does not exist!"
  );
}

export async function postColor(client, color) {
  if (!client) {
    msg();
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  });
  rateMetafields["body"]["metafields"] &&
    rateMetafields["body"]["metafields"].forEach((metafield) => {
      if (metafield["namespace"] === namespace && metafield["key"] === key) {
        let value = JSON.parse(metafield.value);
        if(!value["design"]){
          value["design"] = {}
        }
        let hash = "#"
        value["design"]["color"] = hash.concat("",color);
        client.put({
          path: `metafields/${metafield.id}`,
          data: {
            metafield: {
              id: metafield.id,
              value: JSON.stringify(value),
              value_type: "json_string",
            },
          },
          type: DataType.JSON,
        });
      }
    });
  return "return";
}

export async function postFontColor(client, fontcolor) {
  if (!client) {
    msg();
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  });
  rateMetafields["body"]["metafields"] &&
    rateMetafields["body"]["metafields"].forEach((metafield) => {
      if (metafield["namespace"] === namespace && metafield["key"] === key) {
        let value = JSON.parse(metafield.value);
        if(!value["design"]){
          value["design"] = {}
        }
        value['design']["fontColor"] = fontcolor;
        client.put({
          path: `metafields/${metafield.id}`,
          data: {
            metafield: {
              id: metafield.id,
              value: JSON.stringify(value),
              value_type: "json_string",
            },
          },
          type: DataType.JSON,
        });
      }
    });
  return "return";
}

export async function postFontSize(client, fontsize) {
  if (!client) {
    msg();
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  });
  rateMetafields["body"]["metafields"] &&
    rateMetafields["body"]["metafields"].forEach((metafield) => {
      if (metafield["namespace"] === namespace && metafield["key"] === key) {
        let value = JSON.parse(metafield.value);
        if(!value["design"]){
          value["design"] = {}
        }
        value['design']["fontSize"] = fontsize;
       // picked
        client.put({
          path: `metafields/${metafield.id}`,
          data: {
            metafield: {
              id: metafield.id,
              value: JSON.stringify(value),
              value_type: "json_string",
            },
          },
          type: DataType.JSON,
        });
      }
    });
  return "return";
}

export async function postSize(client, size) {
  if (!client) {
    msg();
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  });
  rateMetafields["body"]["metafields"] &&
  rateMetafields["body"]["metafields"].forEach((metafield) => {
    if (metafield["namespace"] === namespace && metafield["key"] === key) {
      let value = JSON.parse(metafield.value);
      if(!value["design"]){
        value["design"] = {}
      }
      value['design']["size"] = size;
      client.put({
        path: `metafields/${metafield.id}`,
        data: {
          metafield: {
            id: metafield.id,
            value: JSON.stringify(value),
            value_type: "json_string",
          },
        },
        type: DataType.JSON,
      });
    }
  });
  return "return";
}
