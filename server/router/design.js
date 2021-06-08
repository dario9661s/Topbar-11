import Router from "koa-router";
import {
  postColor
} from "../controllers/design_controller";

const router = new Router({ prefix: "/design" });

router.put("/color", async (ctx) => {
  const color = ctx.query.color;
  ctx.body = await postColor(ctx.myClient, color);
});


export default router;
