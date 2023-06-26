import React, { useState, useEffect } from "react";
// import "../css/register.css";
import * as Components from "../css/registerComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const LoginRegister = () => {
  const [signIn, toggle] = React.useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };


  return (
    <div className="container">
    <Components.Container className="">
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Button>Daftar</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={Auth}>
          {isError && <p className="has-text-centered">{message}</p>}
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Components.Input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button>{isLoading ? "loading..." : "Masuk"}</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Selamat Datang!</Components.Title>
            <Components.Paragraph>
              Sudah Punya akun?
              <br />
              Masuk ke Aplikasi dengan Klik Tombol Dibawah Ini
            </Components.Paragraph>

            <Components.GhostButton onClick={() => toggle(true)}>
              Masuk
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello!</Components.Title>
            <Components.Paragraph>
              Belum Punya Akun? <br />
              Daftar Sekarang Dengan Klik Tombol Dibawah Ini
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Daftar Akun
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
    </div>
  );
};

export default LoginRegister;
