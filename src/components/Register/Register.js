import React, { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const onNameChange = e => {
    setName(e.target.value);
    setErr("");
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
    setErr("");
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
    setErr("");
  };

  const onSubmit = e => {
    fetch("https://obscure-cliffs-01531.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        } else if (user === "unable to register") {
          setErr(user);
        } else if (
          user.errors[0].param === "name" ||
          user.errors[0].param === "email" ||
          user.errors[0].param === "password"
        ) {
          setErr(user.errors[0].msg);
        }
      });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <label className="db fw6 lh-copy f6 bg-red" htmlFor="email-address">
              {err}
            </label>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="name"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password (min:6)
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={onSubmit}
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
