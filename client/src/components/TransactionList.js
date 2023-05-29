import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const TransactionList = ({
  transactions,
  defaultHeaders,
  fetchTransactions,
  setTransactionDataForEdit,
}) => {
  const formatDate = (date) => {
    return moment(date).format("MMM DD, YYYY (ddd)");
  };
  const handleRemoveTransaction = async (_id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    console.log(_id);
    const res = await fetch(`/api/expense/delete/${_id}`, {
      ...defaultHeaders,
      method: "DELETE",
    });
    if (res.ok) {
      fetchTransactions();
      alert("deleted successfully");
    }
  };
  const user = useSelector((state) => state.auth.user);
  const getCategoryNameById = (id) => {
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "NA";
  };

  return (
    <>
      <div
        style={{ marginTop: "0.5em", fontSize: "1.2em", fontWeight: "bold" }}
      >
        Transaction List
      </div>
      <TableContainer component={Paper} style={{ marginTop: "0.5em" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Details
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Amount&nbsp;(₩)
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Date
              </TableCell>{" "}
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Category
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                -
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {data.map((month) =>
              month.transactions.map((transaction) => (
                <TableRow
                  key={transaction._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {transaction.details}
                  </TableCell>
                  <TableCell align="center">{transaction.amount}</TableCell>
                  <TableCell align="center">
                    {formatDate(transaction.date)}
                  </TableCell>{" "}
                  <TableCell align="center">
                    {getCategoryNameById(transaction.category_id)}
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <IconButton
                        color="primary"
                        component="label"
                        onClick={() => setTransactionDataForEdit(transaction)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="warning"
                        component="label"
                        onClick={() => handleRemoveTransaction(transaction._id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody> */}
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {transaction.details}
                </TableCell>
                <TableCell align="center">{transaction.amount}</TableCell>
                <TableCell align="center">
                  {formatDate(transaction.date)}
                </TableCell>{" "}
                <TableCell align="center">
                  {getCategoryNameById(transaction.category_id)}
                </TableCell>
                <TableCell align="center">
                  <div>
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => setTransactionDataForEdit(transaction)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => handleRemoveTransaction(transaction._id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TransactionList;
