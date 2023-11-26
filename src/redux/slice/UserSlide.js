import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    gender: "",
    access_token: "",
    id: "",
    isAdmin: false,
    quoctich: "",
    refreshToken: "",
    birthday: "",
};

export const UserSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = "",
                email = "",
                access_token = "",
                address = "",
                phone = "",
                avatar = "",
                _id = "",
                isAdmin,
                quoctich = "",
                refreshToken = "",
                gender = "",
                birthday = "",
            } = action.payload;
            state.name = name ? name : state.name;
            state.gender = gender ? gender : state.gender;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id;
            state.access_token = access_token
                ? access_token
                : state.access_token;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            state.quoctich = quoctich ? quoctich : state.quoctich;
            state.refreshToken = refreshToken
                ? refreshToken
                : state.refreshToken;
            state.birthday = quoctich ? birthday : state.birthday;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.address = "";
            state.phone = "";
            state.avatar = "";
            state.id = "";
            state.access_token = "";
            state.isAdmin = false;
            state.quoctich = "";
            state.refreshToken = "";
            state.birthday = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = UserSlide.actions;

export default UserSlide.reducer;
