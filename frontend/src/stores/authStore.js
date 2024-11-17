import { create } from 'zustand'
import axios from "axios"

const authStore = create((set) => ({

    loggedIn: null,

    loginForm:
    {
        email: "",
        password: ""
    },

    signUpForm:
    {
        email: "",
        password: ""
    },

    updateloginFormState: (e) => {
        e.preventDefault()

        const { name, value } = e.target

        set((state) => {
            return {
                loginForm: {
                    ...state.loginForm,
                    [name]: value
                }

            }
        })
    },

    updateSignUpFormState: (e) => {
        e.preventDefault()

        const { name, value } = e.target

        set((state) => {
            return {
                signUpForm: {
                    ...state.signUpForm,
                    [name]: value
                }

            }
        })
    },

    signUp: async() => {
        const {signUpForm} = authStore.getState()

        try {
            const res = await axios.post("/signup", signUpForm)
            if (res.status === 200) {
                set({ loggedIn: true })
                set({signUpForm:
                    {
                        email: "",
                        password: ""
                    },})
                return true
            }
            return false
        } catch (error) {
            console.error("Signup failed:", error)
            return false
        }
    },

    login: async () => {

        const {loginForm} = authStore.getState()

        try {
            const res = await axios.post("/login", loginForm)
            if (res.status === 200) {
                set({ loggedIn: true })
                set({loginForm:
                    {
                        email: "",
                        password: ""
                    },})
                return true
            }
            return false
        } catch (error) {
            console.error("Login failed:", error)
            return false
        }
    },

    logout: async () => {
        try {
            await axios.get("/logout");
            set({ loggedIn: false });
        } catch (error) {
            console.log(error);
        }
    },

    checkAuth: async () => {
        try {
            await axios.get("/check-auth");
            set({ loggedIn: true })
        } catch (error) {
            set({ loggedIn: false })
        }

    }

}))

export default authStore;