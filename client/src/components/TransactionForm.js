import * as React from "react";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Autocomplete, Box } from "@mui/material";
import dayjs from "dayjs";
import "../styles.css";
import { useSelector } from "react-redux";

export default function TransactionForm({
  defaultHeaders,
  fetchTransactions,
  transactionDataForEdit,
  setTransactionDataForEdit,
}) {
  const user = useSelector((state) => state.auth.user);
  const categories = user ? user.categories : [];
  const initForm = {
    details: "",
    amount: "",
    date: new Date(),
    category_id: "",
  };

  const [data, setData] = useState(initForm);
  useEffect(() => {
    if (transactionDataForEdit.amount !== undefined) {
      setData(transactionDataForEdit);
    }
  }, [transactionDataForEdit]);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleDate = (newDate) => {
    setData({ ...data, date: newDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res =
      transactionDataForEdit.amount === undefined ? create() : update();
    // const responseMsg = await res.json();
    // console.log(responseMsg);
  };
  const reload = (res) => {
    if (res.ok) {
      setData(initForm);
      fetchTransactions();
    }
  };
  const getCategoryNameById = () => {
    return categories.find((e) => e._id === data.category_id) ?? "";
  };
  async function create() {
    const res = await fetch("/api/expense/createTransaction", {
      ...defaultHeaders,
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseMsg = await res.json();
    alert(responseMsg.message);
    reload(res);
  }
  async function update() {
    const res = await fetch(
      `/api/expense/updateTransaction/${transactionDataForEdit._id}`,
      {
        ...defaultHeaders,
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    setTransactionDataForEdit({});
    const responseMsg = await res.json();
    alert(responseMsg.message);
    reload(res);
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            // sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Details"
            variant="outlined"
            onChange={handleInput}
            value={data.details}
            name="details"
          />
          <TextField
            // sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            onChange={handleInput}
            name="amount"
            type="number"
            value={data.amount}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={dayjs(data.date)}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              console.log(newValue);
              setData({ ...data, category_id: newValue._id });
            }}
            sx={{ width: 200 }}
            // inputValue={data.category}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            // id="controllable-states-demo"
            options={categories}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          {transactionDataForEdit.amount !== undefined ? (
            <Button type="submit" variant="secondary" sx={{ height: 52 }}>
              Update
            </Button>
          ) : (
            <Button type="submit" variant="contained" sx={{ height: 52 }}>
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
