import { FC, useEffect, useRef, useState } from "react"
import Worker from "worker-loader!../../workers/astar.worker";
import AStar from "../../utils/astar";
import styles from "./section1.module.scss"

type Props = {
  startAstar?: boolean
}

let instance: any = null;
let astar: AStar;

const Section1: FC<Props> = ({ startAstar = true }) => {
  const astarCanvas = useRef<HTMLCanvasElement>(null);

  const startAstarAlgorithm = () => {
    if (startAstar && astarCanvas.current) {
      if (!instance) {
        anim()
      } else {
        instance.postMessage({
          mes: "start",
        })
      }
    }
  }

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

  useEffect(() => {
    startAstarAlgorithm();
  }, [startAstar])

  useEffect(() => {
    if (astarCanvas.current) {
      astarCanvas.current.width = astarCanvas.current.clientWidth;
      astarCanvas.current.height = astarCanvas.current.clientHeight;

      try {
        const canvas = astarCanvas.current.transferControlToOffscreen();
        instance = new Worker();

        instance.postMessage({
          mes: "init",
          canvas
        }, [canvas])
      } catch (e) {
        const canvas = astarCanvas.current;
        astar = new AStar(canvas, 100)
        astar.render();
      }
    }

  }, [])

  // const nextFrame = () => {
  //   if(astar && !astar.completed){
  //     astar.next(2)
  //     astar.render()
  //     requestAnimationFrame(nextFrame)
  //   }

  //   if(astar?.completed){
  //     astar.reset()
  //     requestAnimationFrame(nextFrame)
  //   }
  // }

  return <div className={styles.container}>
    <div className={styles.overlay}></div>
    <canvas className={styles.astar} ref={astarCanvas} />
  </div>
}

export default Section1