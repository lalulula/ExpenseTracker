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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";

export default function CategoryForm({
  defaultHeaders,
  categoryDataForEdit,
  setCategoryDataForEdit,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const categories = user ? user.categories : [];
  const initForm = {
    label: "",
    icon: "",
  };
  const icons = ["User"];

  const [data, setData] = useState(initForm);
  useEffect(() => {
    if (categoryDataForEdit._id !== undefined) {
      setData(categoryDataForEdit);
    }
  }, [categoryDataForEdit]);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const res = categoryDataForEdit.label === undefined ? create() : update();
    // const responseMsg = await res.json();
    // console.log(responseMsg);
  };
  const reload = (res, _user) => {
    if (res.ok) {
      // const updatedUser = {
      //   ...user,
      //   categories: [...user.categories, { ...data }],
      // };
      dispatch(setUser(_user));
      setData(initForm);
    }
  };
  const getCategoryNameById = () => {
    return categories.find((e) => e._id === data.category_id) ?? "";
  };

  async function create() {
    const res = await fetch("/api/category/createCategory", {
      ...defaultHeaders,
      method: "POST",
      body: JSON.stringify(data),
    });
    const updatedUser = {
      ...user,
      categories: [...user.categories, { ...data }],
    };
    reload(res, updatedUser);
  }

  async function update() {
    const res = await fetch(
      `/api/category/updateCategory/${categoryDataForEdit._id}`,
      {
        ...defaultHeaders,
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    const updatedUser = {
      ...user,
      categories: user.categories.map((category) =>
        category._id === categoryDataForEdit._id ? data : category
      ),
    };
    setCategoryDataForEdit({});
    reload(res, updatedUser);
    // const responseMsg = await res.json();
    // alert(responseMsg.message);
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">Add New Category </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            // sx={{ marginRight: "5px" }}
            id="outlined-basic"
            label="Label"
            variant="outlined"
            onChange={handleInput}
            value={data.label}
            name="label"
            type="text"
          />

          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setData({ ...data, icon: newValue });
            }}
            sx={{ width: 200 }}
            id="icons"
            options={icons}
            renderInput={(params) => <TextField {...params} label="Icons" />}
          />
          {categoryDataForEdit._id !== undefined ? (
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
