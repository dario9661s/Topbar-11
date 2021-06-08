import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag";
import campaign from "./campaign"
import design from "./design"

const router = combineRouters(scriptTagRouter, campaign, design);

export default router;
