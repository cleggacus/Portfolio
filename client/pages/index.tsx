import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Section1 from '../components/home/section1'
import { Layout } from '../components/layout'
import { Start } from '../components/start'
import styles from './index.module.scss'

const Home: NextPage = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [showStart, setShowStart] = useState(true)

  return <Layout showNavbar={showNavbar}>
    <Section1 startAstar={!showStart} />

    {
      showStart && <Start
        command1Func={() => setShowNavbar(true)}
        command2Func={() => setShowStart(false)}
      />
    }
  </Layout>
}

export default Home