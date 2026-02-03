import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import { getCookie } from "./library/cookie"
import { inc } from "./library/tools"
import { useAuth } from "./provideAuth"

import img_404 from "./images/page-not-found.png"

// 首頁、登入
import Home from "./containers/clients/FWHome"
import Login from "./containers/FWLogin"

// C
// 所有預約資料
import Schedule from "./containers/clients/FWSchedule"
// 預約stepper
import Bookings from "./containers/clients/FWBookings"
// 使用者基本資料
import UserSettings from "./containers/clients/FWUserSettings"

// G
// 首頁後台管理
import AdminBackstage from "./containers/adms/FWAdminBackstage"
// 預約管理
import AdminBookings from "./containers/adms/FWAdminBookings"
// 服務項目管理
import AdminServices from "./containers/adms/FWAdminServices"

// import Notpage from "./components/statics/Notpage"

const ROUTE_CONFIG = {
  C: {
    basePath: '/',
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/schedule', exact: true, component: Schedule },
      { path: '/booking', exact: true, component: Bookings },
      { path: '/settings', exact: true, component: UserSettings },
      // { path: '/booking/:id', exact: true, component: BookingDetail },
    ]
  },
  G: {
    basePath: '/admin',
    routes: [
      { path: '/admin', exact: true, component: AdminBackstage },
      { path: '/admin/bookings', exact: true, component: AdminBookings },
      // { path: '/admin/bookings/:id', exact: true, component: AdminBookingDetail },
      // { path: '/admin/users', exact: true, component: AdminUsers },
      // { path: '/admin/reports', exact: true, component: AdminReports },
      { path: '/admin/services', exact: true, component: AdminServices },
    ]
  }
};

// ===== 權限檢查組件 =====
const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  // 未登入 -> 導向 login
  if (!auth?.role) {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }

  const roleKey = auth.role.toUpperCase();
  const config = ROUTE_CONFIG[roleKey] || ROUTE_CONFIG['C']; // Fallback to 'C' if role is unknown but user is logged in

  const currentPath = location.pathname;

  // // 檢查當前路徑是否屬於該角色
  // const isValidPath = config.routes.some(route => {
  //   route.exact
  //     ? currentPath === route.path
  //     : currentPath.startsWith(route.path)
  // });
  // // 有登入但走錯路 → 導角色首頁
  // if (!isValidPath) {
  //   return <Redirect to={config.basePath} />;
  // }


  return <>{children}</>;
};


const Routes = (props) => {
  const { role } = useAuth()
  // 已登入時根據角色渲染對應路由
  const config = ROUTE_CONFIG[role?.toUpperCase()];
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <AuthGuard>
          <Switch>
            {/* <Route exact path="/login" component={Login} /> */}
            {config?.routes?.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            {/* <Route path="*" component={Notpage} /> */}
          </Switch>
        </AuthGuard>
      </Switch>
    </>
  );
};

export default Routes;
