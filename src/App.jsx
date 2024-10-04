import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Layout from "./layouts/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./contexts/AuthProvider";
import NavBar from "./layouts/main/NavBar";
import AboutPage from "./pages/AboutPage";
import Login from "./layouts/Login";
import Loader from "./components/Loader"; // Import the Loader component

const WebsitePage = lazy(() => import("./pages/WebsitePage"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (e.g., waiting for some resources)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate 2 seconds loading time
  }, []);

  if (isLoading) {
    return <Loader />; // Show loader until content is ready
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}> {/* Use loader for Suspense fallback */}
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
              <Route
                exact={true}
                path="/about"
                element={
                  <div
                    className="flex flex-col w-full"
                    style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
                  >
                    <NavBar />
                    <div className="flex-grow border-2">
                      <AboutPage />
                    </div>
                  </div>
                }
              />
              <Route exact={true} path="/:domain" element={<WebsitePage />} />
              {/* Redirecting unknown url to 404 page */}
              {/* <Route path="*" element={<Page404 />} /> */}
            </Routes>
            <Login />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
};

export default App;
