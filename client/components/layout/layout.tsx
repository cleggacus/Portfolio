import Head from "next/head";
import { FC } from "react";
import { Navbar } from ".";
import { StoreProvider } from "../store";
import styles from "./layout.module.scss"

type IProps = {
  description?: string,
  title?: string,
  showNavbar?: boolean
}

const Layout: FC<IProps> = ({
  children,
  description = "",
  title = "cleggacus",
  showNavbar = true
}) => {
  return <StoreProvider>
    <div className={styles.container}>
      <Head>
        <title>Liam Clegg | {title}</title>
        <meta name="description" content={`Liam Clegg (cleggacus) protfolio. ${description}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <Navbar show={showNavbar} />
    </div>
  </StoreProvider>
}

export default Layout;