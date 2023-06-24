/* eslint-disable no-empty */
import { useState } from "react"
import DefaultLayout from "../layout/defaultLayout";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useAuth } from "../auth/authProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constans";
import { AuthResponseError } from "../types/types";

export default function SiginUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/siginup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          email,
          password
        })
      });
      if (response.ok) {
        console.log("User create successfully.");
        setErrorResponse("");
        
        goTo("/");
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
        <h1>Please check your data.</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-4">
    <label htmlFor="validationDefault01" className="form-label">First name</label>
    <input type="text" className="form-control" id="validationDefault01" required value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationDefault02" className="form-label">Last name</label>
    <input type="text" className="form-control" id="validationDefault02" required value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationDefaultUsername" className="form-label">Username</label>
    <div className="input-group">
      <span className="input-group-text" id="inputGroupPrepend2">@</span>
      <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required value={userName} onChange={(e)=> setUserName(e.target.value)}/>
    </div>
                </div>
                <div className="form-floating mb-3 has-validation">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" aria-describedby="inputGroupPrepend" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Create user.</button>
  </div>
</form>
        
        </div>
      </DefaultLayout>
    )
}