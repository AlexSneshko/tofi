import React, { useEffect } from 'react'
import commonStyles from '../../styles/common.module.scss'
import { getUserProfile } from '../../api/getUser'
import { CreateCreditForm } from '../../components/CreateCreditForm/CreateCreditForm'
import styles from './CreditPage.module.scss'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { CreditsList } from '../../components/CreditsList/CreditsList'

export const CreditsPage = () => {
  // useEffect(() => {
  //   getUserProfile()
  // }, [])

  return (
    <section className={commonStyles.container}>
      <Tabs className={styles.tabs} defaultIndex={0}>
        <TabList>
          <Tab>Credits</Tab>
          <Tab>Create credit</Tab>
        </TabList>
        <TabPanel><CreditsList/></TabPanel>
        <TabPanel><CreateCreditForm /></TabPanel>
      </Tabs>
    </section>
  )
}

