import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Fragment, useEffect, useState } from "react";
import { isJsonString } from "./ultils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slice/UserSlide";
import * as userService from "../src/services/UserService";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const role = localStorage.getItem("isAdmin");

    useEffect(() => {
        setIsLoading(true);
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDecoded = () => {
        let storageData =
            user?.access_token || localStorage.getItem("access_token");
        let decoded = {};
        if (storageData && isJsonString(storageData) && !user?.access_token) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    userService.axiosJWT.interceptors.request.use(
        async (config) => {
            // Do something before request is sent
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            let storageRefreshToken = localStorage.getItem("refresh_token");
            const refreshToken = JSON.parse(storageRefreshToken);
            const decodedRefreshToken = jwtDecode(refreshToken);
            if (decoded?.exp < currentTime.getTime() / 1000) {
                if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
                    const data = await userService.refreshToken(refreshToken);
                    config.headers["token"] = `Bearer ${data?.access_token}`;
                } else {
                    dispatch(resetUser());
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem("refresh_token");
        const refreshToken = JSON.parse(storageRefreshToken);
        const res = await userService.getDetailsUser(id, token);
        dispatch(
            updateUser({
                ...res?.data,
                access_token: token,
                refreshToken: refreshToken,
            })
        );
    };

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <LoadingComponent isPending={isLoading}>
                <Router>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.page;
                            let path = "";
                            if (route.isPrivate) {
                                path = role === "ADMIN" ? route.path : "";
                            } else if (route.isUser) {
                                path = role ? route.path : "";
                            } else {
                                path = route.path;
                            }

                            const Navabar = route.isSideBar;
                            const DefaultComponent = route.defaultLayout;
                            return (
                                <Route
                                    path={path}
                                    key={route.path}
                                    element={
                                        route.isShowHeader ? (
                                            <DefaultComponent
                                                isSideBar={
                                                    route.isSideBar && (
                                                        <Navabar />
                                                    )
                                                }
                                            >
                                                <Page></Page>
                                            </DefaultComponent>
                                        ) : (
                                            <Fragment>
                                                <Page></Page>
                                            </Fragment>
                                        )
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </Router>
            </LoadingComponent>
        </div>
    );
}

export default App;
