import { useEffect, useState } from "react";
import "../App.css";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart";
function Home() {
  const token = Cookies.get("token");
  const defaultHeaders = {
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      Authorization: `Bearer ${token}`,
    },
  };
  const [transactions, setTransactions] = useState([]);
  const [transactionDataForEdit, setTransactionDataForEdit] = useState({});
  const [groupedData, setGroupedData] = useState({});
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = Cookies.get("token");
    const res = await fetch("/api/expense/getTransactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const transactionData = await res.json();
    setTransactions(transactionData);
    fetchGroupTransactions();
  };
  const fetchGroupTransactions = async () => {
    const token = Cookies.get("token");
    const res = await fetch("/api/expense/getGroupedTransactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const response = await res.json();
    console.log(response);
    setGroupedData(response);
  };
  return (
    <>
      <Container>
        <TransactionChart groupedTransaction={groupedData} />
        <TransactionForm
          defaultHeaders={defaultHeaders}
          fetchTransactions={fetchTransactions}
          transactionDataForEdit={transactionDataForEdit}
          setTransactionDataForEdit={setTransactionDataForEdit}
        />
        <TransactionList
          defaultHeaders={defaultHeaders}
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          setTransactionDataForEdit={setTransactionDataForEdit}
        />
      </Container>
    </>
  );
}
export default Home;
