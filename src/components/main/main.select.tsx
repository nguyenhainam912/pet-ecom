"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MainSelect = () => {
  const [condition, setCondition] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value);
  };

  useEffect(() => {
    if (condition) {
      const params = new URLSearchParams(searchParams);
      params.set("sort", condition);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [condition]);

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
        value={condition}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>Sắp xếp theo giá</em>
        </MenuItem>
        <MenuItem value={"-price"}>Cao Đến Thấp</MenuItem>
        <MenuItem value={"price"}>Thấp Đến Cao</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MainSelect;
