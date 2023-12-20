import React, { useEffect } from "react";
import { TransferForm } from "../../components/TransferForm/TransferForm";
import commonStyles from "../../styles/common.module.scss";
import { getUserAccounts } from "../../api/getUserAccount";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { TransactionsList } from "../../components/TransactionsList/TransactionsList";
import styles from './TransactionPage.module.scss'

export const TransactionPage = () => {
  return (
    <section className={commonStyles.container}>
      <Tabs className={styles.tabs} defaultIndex={1}>
        <TabList>
          <Tab>Transfers</Tab>
          <Tab>Autoransfers</Tab>
          <Tab>Create Transfer</Tab>
        </TabList>
        <TabPanel><TransactionsList isAutoTransactions={false} /></TabPanel>
        <TabPanel><TransactionsList isAutoTransactions={true} /></TabPanel>
        <TabPanel><TransferForm /></TabPanel>
      </Tabs>
    </section>
  );
};
