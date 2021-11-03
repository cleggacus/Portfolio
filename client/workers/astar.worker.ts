import AStar from "../utils/astar";

const ctx: Worker = self as any;

let astar: AStar;

const anim = () => {
  if (!astar.completed) {
    astar.next(20);
    astar.render();
    requestAnimationFrame(anim)
  } else {
    astar.reset()
    requestAnimationFrame(anim)
  }
}

ctx.onmessage = (message) => {
  if (message.data.mes == "init") {
    const canvas = message.data.canvas
    astar = new AStar(canvas, 100)
    astar.render();
  } else if (message.data.mes == "start") {
    anim()
  }
};
