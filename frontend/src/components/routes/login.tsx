import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import DefaultLayout from "../layout/defaultLayout"
import { useState } from "react"
import { useAuth } from "../auth/authProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constans";
import { AuthResponse, AuthResponseError } from "../types/types";


export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const [errorResponse, setErrorResponse] = useState("");   
  const goTo = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName,
          password
        })
      });
      if (response.ok) {
        console.log("Login successfully.");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo("/dashboard");
        }
      } else {
        console.log("Something went wrong");
        const json = await response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
              console.log(error);
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard"/>
  }
    return (
        <DefaultLayout>
            <div className="container-lg align-items-center">
                <h1>Login.</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <form className="row g-3 needs-validation align-items-center" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                            <div className="input-group has-validationform-floating">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                                    <div className="invalid-feedback">
                                    Please choose a username.
                                    </div>
                            </div>
                    </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Login in</button>
                </div>
            </form>
        </div>
        </DefaultLayout>
        
    )
}
