import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    course: {},
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUser: (state, action)=>{
            state.user = action.payload.user;
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setCourse: (state, action) => {
            state.course = action.payload.course;
        },
    },
});

export const { setMode, setLogin, setLogout, setCourse, setUser } =
    authSlice.actions;
export default authSlice.reducer;
