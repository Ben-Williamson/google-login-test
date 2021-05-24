import './App.css';
import { GoogleLogin, GoogleLogout } from "react-google-login";

require("dotenv").config();

console.log(process.env.CLIENT_ID);

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes:", newAuthRes);

    console.log("new auth token", newAuthRes.id_token);
  }

  setTimeout(refreshToken, refreshTiming);
}

function Login() {
  const handleLogin = async googleData => {
    const res = await fetch("https://fauna-notes-api.herokuapp.com/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.CLIENT_ID}`}
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  )
}

function Logout() {
  const onSuccess = () => {
    alert("Logout completed successfully.")
  }

  return (
    <div>
      <GoogleLogout
        clientId={process.env.CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Login />
      {/* <Logout /> */}
    </div>
  );
}

export default App;
