import NavBarComponentHomePage from "../components/NavBarComponentHomePage/NavBarComponentHomePage";
import NavBarComponentProfile from "../components/NavBarComponentProfile/NavBarComponentProfile";
import HomaPage from "../page/HomaPage/HomaPage";
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import OrderPage from "../page/OrderPage/OrderPage";
import ProductDetailPage from "../page/ProductDetailPage/ProductDetailPage";
import Profile from "../page/ProfilePage/ProfilePage";
import AdminPage from "../page/admin/AdminPage/AdminPage";
import DefaultComponent from "../components/DefaultComponent/DefaultComponent";
import AdminDefaultComponent from "../components/AdminComponent/AdminDefaultComponent/AdminDefaultComponent";
import ProductPage from "../page/admin/ProductPage/ProductPage";
import SearchPage from "../page/SearchPage/SearchPage";
import TypeProductPage from "../page/TypeProductPage/TypeProductPage";
import PaymentPage from "../page/PaymentPage/PaymentPage";
import MyOrderPage from "../page/MyOrder/MyOrder";
import PhonePage from "../page/PhonePage/PhonePage";
import EmailPage from "../page/EmailPage/EmailPage";
import PassWordPage from "../page/PassWordPage/PassWordPage";

export const routes = [
    {
        path: "/",
        page: HomaPage,
        isShowHeader: true,
        isSideBar: NavBarComponentHomePage,
        defaultLayout: DefaultComponent,
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
        defaultLayout: DefaultComponent,
    },
    {
        path: "/myorder",
        page: MyOrderPage,
        isShowHeader: true,
        defaultLayout: DefaultComponent,
        isSideBar: NavBarComponentProfile,
        isUser: true,
    },
    {
        path: "/payment",
        page: PaymentPage,
        isShowHeader: true,
        defaultLayout: DefaultComponent,
    },
    {
        path: "/profile",
        page: Profile,
        isShowHeader: true,
        isSideBar: NavBarComponentProfile,
        defaultLayout: DefaultComponent,
        isUser: true,
    },
    {
        path: "/profile/phone",
        page: PhonePage,
        isShowHeader: true,
        isSideBar: NavBarComponentProfile,
        defaultLayout: DefaultComponent,
        isUser: true,
    },
    {
        path: "/profile/changepassword",
        page: PassWordPage,
        isShowHeader: true,
        isSideBar: NavBarComponentProfile,
        defaultLayout: DefaultComponent,
        isUser: true,
    },
    {
        path: "/profile/email",
        page: EmailPage,
        isShowHeader: true,
        isSideBar: NavBarComponentProfile,
        defaultLayout: DefaultComponent,
        isUser: true,
    },
    {
        path: "/product-detail",
        page: ProductDetailPage,
        isShowHeader: true,
        defaultLayout: DefaultComponent,
    },
    {
        path: "/search",
        page: SearchPage,
        isShowHeader: true,
        defaultLayout: DefaultComponent,
    },
    {
        path: "/admin/product",
        page: ProductPage,
        isShowHeader: true,
        isPrivate: true,
        defaultLayout: AdminDefaultComponent,
    },
    {
        path: "/admin/user",
        page: AdminPage,
        isShowHeader: true,
        isPrivate: true,
        defaultLayout: AdminDefaultComponent,
    },
    {
        path: "/product/:type",
        isSideBar: NavBarComponentHomePage,
        page: TypeProductPage,
        isShowHeader: true,
        defaultLayout: DefaultComponent,
    },
    {
        path: "*",
        page: NotFoundPage,
    },
];
