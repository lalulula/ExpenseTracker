import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";
import CategoryForm from "../components/CategoryForm";
import Cookies from "js-cookie";

const Category = ({ defaultHeaders }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [transactions, setTransactions] = useState([]);
  const [categoryDataForEdit, setCategoryDataForEdit] = useState([]);

  const handleEditCategory = (category) => {
    setCategoryDataForEdit(category);
  };
  const deleteCategoryById = async (_id) => {
    console.log(_id);
    const res = await fetch(`/api/category/delete/${_id}`, {
      ...defaultHeaders,
      method: "DELETE",
    });
    if (res.ok) {
      const updatedUser = {
        ...user,
        categories: user.categories.filter((category) => category._id != _id),
      };
      dispatch(setUser(updatedUser));
    }
  };
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
  };

  return (
    <>
      <CategoryForm
        defaultHeaders={defaultHeaders}
        categoryDataForEdit={categoryDataForEdit}
        setCategoryDataForEdit={setCategoryDataForEdit}
      />
      <div
        style={{ marginTop: "0.5em", fontSize: "1.2em", fontWeight: "bold" }}
      >
        Category List
      </div>
      <TableContainer component={Paper} style={{ marginTop: "0.5em" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Label
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Icon&nbsp;(₩)
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                -
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((category) => (
              <TableRow
                key={category._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {category.label}
                </TableCell>
                <TableCell align="center">{category.icon}</TableCell>

                <TableCell align="center">
                  <div>
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => handleEditCategory(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => deleteCategoryById(category._id)}
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
export default Category;
