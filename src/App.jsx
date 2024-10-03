import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Layout from "./layouts/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./contexts/AuthProvider";
import NavBar from "./layouts/main/NavBar";
import AboutPage from "./pages/AboutPage";
const WebsitePage = lazy(() => import("./pages/WebsitePage"));

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
      <BrowserRouter>
      <Suspense fallback={<div>Laoding...</div>}>
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}
          </Route>
          <Route exact={true} path="/about" element={<div><NavBar /><AboutPage /></div>} />
          <Route exact={true} path="/:domain" element={<WebsitePage />} />
          {/* Redirecting unknown url to 404 page */}
          {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
    </Provider>
    </AuthProvider>
  );
};

export default App;
