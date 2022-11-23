import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "@/auth/context";
import { saveUserToken } from "@/auth/storage";
import { userLogin } from "@/services/authService";

type LocationProps = {
  state: {
    from: Location;
  };
};

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const updateForm = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await userLogin(form.username, form.password);
    if (res.status == 200) {
      const from = location.state?.from?.pathname || "/home";
      if (res.data.accessToken) {
        saveUserToken(res.data.accessToken);
        navigate(from, { replace: true });
        window.location.reload();
      }
    } else {
      alert("Login Failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col space-y-4 justify-center items-center h-screen">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-primary w-fit"
          name="username"
          autoComplete="username"
          required
          value={form.username}
          onChange={updateForm}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary w-fit"
          name="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={updateForm}
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
