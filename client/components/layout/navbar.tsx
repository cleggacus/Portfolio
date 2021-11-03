import { FC } from "react";
import styles from "./navbar.module.scss";

type Props = {
  show?: boolean
}

const Navbar: FC<Props> = ({ show = true }) => {
  return <div className={`${styles.container} ${!show && styles.hide}`} >
    <div>
      <h1>Liam Clegg</h1>
    </div>

    <ul>
      <li>
        <a>Home</a>
        <a>Projects</a>
        <a>About Me</a>
        <a>Contact</a>
        <a>Blog</a>
      </li>
    </ul>
  </div>
}

export default Navbar;