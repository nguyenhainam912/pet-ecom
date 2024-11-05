"use client";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { IUser } from "@/types/next-auth";
const AuthRegister = (props: any) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState<string>("");

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [isErrorRePassword, setIsErrorRePassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorRePassword, setErrorRePassword] = useState<string>("");

  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const handleSubmit = async () => {
    setIsErrorUsername(false);
    setIsErrorPassword(false);
    setErrorUsername("");
    setErrorPassword("");

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername("Username is not empty.");
      return;
    }
    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty.");
      return;
    }
    if (!repassword) {
      setIsErrorRePassword(true);
      setErrorRePassword("Re-Enter Password is not empty.");
      return;
    }

    if (repassword != password) {
      setIsErrorRePassword(true);
      setErrorRePassword("The re-entered password does not match.");
      return;
    }

    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      method: "POST",
      body: {
        email: username,
        password: password,
      },
    });
    if (!res?.error) {
      //redirect to home
      router.push("/auth/signin");
    } else {
      setOpenMessage(true);
      setResMessage(res.message as string);
    }
  };

  return (
    <Box>
      <TextField
        onChange={(event) => setUsername(event.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Username"
        name="username"
        autoFocus
        error={isErrorUsername}
        helperText={errorUsername}
      />
      <TextField
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        error={isErrorPassword}
        helperText={errorPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword === false ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        onChange={(event) => setRePassword(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="repassword"
        label="Nhập lại Password"
        type={showPassword ? "text" : "password"}
        error={isErrorRePassword}
        helperText={errorRePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword === false ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{
          my: 3,
        }}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Đăng ký
      </Button>

      <Snackbar
        open={openMessage}
        // autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenMessage(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthRegister;
