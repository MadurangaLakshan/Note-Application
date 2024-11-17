import React from 'react'
import authStore from '../stores/authStore'
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {

    const store = authStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await store.signUp();

        try {
            if (success) {
                navigate("/");
            } else {
                alert("Signin failed: Please check your credentials.");
            }
        } catch (error) {
            console.log(error)
        }

       
    };

    return (
        <div>
            <h1>SignIn</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={store.updateSignUpFormState} value={store.signUpForm.email} type="email" name="email" placeholder="email" />
                <input onChange={store.updateSignUpFormState} value={store.signUpForm.password} type="password" name="password" placeholder="password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}
