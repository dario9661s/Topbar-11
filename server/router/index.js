import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag";
import campaign from "./campaign"
import design from "./design"
import animation from "./animation"

const router = combineRouters(scriptTagRouter, campaign, design, animation);

export default router;
