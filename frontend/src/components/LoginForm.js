import authStore from "../stores/authStore"
import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const LoginForm = () => {

    const store = authStore()
    const navigate = useNavigate()

    useEffect(() => {

        if (store.loggedIn === true) {
            alert("You are already logged in");
            navigate("/");
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await store.login();

        if (success) {
            navigate("/");
        } else {
            alert("Login failed: Please check your credentials.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={store.updateloginFormState} value={store.loginForm.email} type="email" name="email" placeholder="email" />
                <input onChange={store.updateloginFormState} value={store.loginForm.password} type="password" name="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
