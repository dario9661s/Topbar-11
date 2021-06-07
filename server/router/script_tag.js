import Router from "koa-router";
import {
  createScriptTag,
  deleteScriptTagById,
  getAllScriptTags,
  fetchShipping,
  fetchShopUrl,
  postLink
} from "../controllers/script_tag_controller";

const router = new Router({ prefix: "/script_tag" });
router.get("/", async (ctx) => {
  ctx.body = "Get script tag";
});
router.get("/all", async (ctx) => {
  console.log("Get all script tag");
  const result = await getAllScriptTags(ctx.myClient, "https://google.com/");
  ctx.body = {
    installed: result.length > 0,
    details: result,
  };
});
router.get("/ship", async (ctx) => {
  const result = await fetchShipping(ctx.myClient);
  ctx.body = {
    details: result,
  };
});
router.get("/shop", async (ctx) => {
  const result = await fetchShopUrl(ctx.myClient);
  ctx.body = {
    details: result,
  };
});
router.post("/link", async (ctx) => {
  console.log(ctx.myClient)
  const result  = await postLink(ctx.myClient);
  ctx.body = {
    details: result
  }
});
router.post("/", async (ctx) => {
  console.log("create script tag", ctx.sesionFromToken);
  //const { shop, accessToken } = ctx.sesionFromToken;
  await createScriptTag(ctx.myClient);
  ctx.body = "Create a script tag";
});

router.delete("/", async (ctx) => {
  const id = ctx.query.id;
  const result = await deleteScriptTagById(ctx.myClient, id);
  ctx.body = result;
});


//post with query
// router.post("/colors", async (ctx) => {
//   console.log(ctx.query)
//   const color = ctx.query.color;
//   console.log( "color" + color)
//   const result = await postColor(ctx.myClient, color);
//   ctx.body = result;
// });


export default router;
