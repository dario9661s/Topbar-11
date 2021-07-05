import Router from "koa-router";
import {
  postColor,
  postFontColor,
  postFontSize,
  postSize,
  postItalic
} from "../controllers/design_controller";

const router = new Router({ prefix: "/design" });

router.put("/design", async (ctx) => {
  const italic = ctx.query.italic;
  const size = ctx.query.size;
  const color = ctx.query.color;
  const fontsize = ctx.query.fontsize;
  const fontcolor = ctx.query.fontcolor;
  ctx.body = await postColor(ctx.myClient, color, italic, size, fontsize, fontcolor);
});

// router.put("/fontcolor", async (ctx) => {
  
//   ctx.body = await postFontColor(ctx.myClient, fontcolor);
// });

// router.put("/fontsize", async (ctx) => {
 
//   ctx.body = await postFontSize(ctx.myClient, fontsize);
// });

// router.put("/size", async (ctx) => {
 
//   ctx.body = await postSize(ctx.myClient, size);
// });
// router.put("/italic", async (ctx) => {
 
//   ctx.body = await postItalic(ctx.myClient, italic);
// });
export default router;
