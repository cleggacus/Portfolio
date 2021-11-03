import { FC, useEffect, useState } from "react";
import styles from "./start.module.scss";

type Props = {
  command1Func: () => void,
  command2Func: () => void
}

const terminalStart = "[cleggacus@arch ~]$ ";
const targetCommand1 = `${terminalStart}sudo systemctl start nav_bar`;
const targetCommand2 = `${terminalStart}./start`;

const returnDelay = 150;

const Start: FC<Props> = ({ command1Func, command2Func }) => {
  const [command1, setCommand1] = useState(terminalStart)
  const [command2, setCommand2] = useState("")
  const [hidden, setHidden] = useState(false)

  const randomTypingInterval = () => {
    return Math.random() * 15 + 20
  }

  useEffect(() => {
    if (command1.length < targetCommand1.length) {
      setTimeout(() => {
        setCommand1(targetCommand1.substring(0, command1.length + 1));
      }, randomTypingInterval());
    } else {
      setTimeout(() => {
        command1Func()
        setCommand2(terminalStart)
      }, returnDelay);
    }
  }, [command1])

  useEffect(() => {
    if (
      command2.length < targetCommand2.length &&
      command1.length == targetCommand1.length
    ) {
      setTimeout(() => {
        setCommand2(targetCommand2.substring(0, command2.length + 1))
      }, randomTypingInterval());
    }

    if (command2 == targetCommand2) {
      setTimeout(() => {
        setHidden(true);
      }, returnDelay);
    }
  }, [command2])

  useEffect(() => {
    if (hidden) {
      setTimeout(() => {
        command2Func()
      }, 500)
    }
  }, [hidden])

  return <div className={`${styles.container} ${hidden && styles.hide}`}>
    <div className={styles.terminal}>
      <code data-text={command1} className={styles.glitch1}>{command1}</code>
      <code data-text={command2} className={styles.glitch1}>{command2}</code>
    </div>
  </div>
}

export default Start;