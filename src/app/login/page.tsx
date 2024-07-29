"use client";

import { useState } from "react";
import { useWixClient } from "../../../hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

function LoginPage() {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }

  console.log(isLoggedIn);

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pathName = usePathname();

  const formTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.EMAIL_VERIFICATION
      ? "Verify your email"
      : "Reset your password";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.EMAIL_VERIFICATION
      ? "Verify"
      : "Reset";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let res;

      switch (mode) {
        case MODE.LOGIN:
          res = await wixClient.auth.login({
            email,
            password,
          });

          break;
        case MODE.REGISTER:
          res = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });

          break;
        case MODE.RESET_PASSWORD:
          res = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your email");
          break;
        case MODE.EMAIL_VERIFICATION:
          res = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });

          break;

        default:
          break;
      }

      console.log(res);

      switch (res?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Suuccessfull! You are being redirected");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            res.data.sessionToken
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            res.errorCode === "invalidEmail" ||
            res.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password");
          } else if (res.errorCode === "emailAlreadyExists") {
            setError("Email already exists");
          } else if (res.errorCode === "resetPassword") {
            setError("You need to reset password");
          } else {
            setError("Something went wrong");
          }

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center px-4 md:px-8 lg:px16 xl:px-32 2xl:px-64">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="John"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}

        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password
          </div>
        )}
        <button
          className="bg-notif text-white p-3 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>

        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account
          </div>
        )}

        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}

        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}

        {message && <div className="text-green-700 text-sm">{message}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
