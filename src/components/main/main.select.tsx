"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

const MainSelect = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
      }}
      size="small"
    >
      <Typography>Sắp xếp: </Typography>
      <Select
        value={age}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>Sắp Xêp Theo Sản Phẩm Mới</em>
        </MenuItem>
        <MenuItem value={10}>Sắp Xêp Theo Giá: Cao Đến Thấp</MenuItem>
        <MenuItem value={10}>Sắp Xêp Theo Giá: Thấp Đến Cao</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MainSelect;
