import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        confPassword: confPassword,
        role: role,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

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
        {/* form register */}
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={RegisterUser}>
            <Components.Title>Buat Akun</Components.Title>
            <Components.Input
              type="text"
              placeholder="Nama"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <Components.Input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <Components.Input
              type="password"
              placeholder="Confirm Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option hidden>Daftar Sebagai?</option>
                    <option value="pencari kost">pencari kost</option>
                    <option value="pemilik kost">pemilik kost</option>
                  </select>
                </div>
              </div>
            </div>
            <Components.Button type="submit" onClick={RegisterUser}>
              Daftar
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        {/* form login */}
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
            <Components.Anchor href="#">Lupa Password?</Components.Anchor>
            <Components.Button>
              {isLoading ? "loading..." : "Masuk"}
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            {/* overlay login */}
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

            {/* overlay register */}
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
