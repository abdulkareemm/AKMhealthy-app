import { Route, Routes, BrowserRouter } from "react-router-dom";
import {  ApplyDoctor, Home, Login, Register } from "./pages";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ProtectorRoutes, PublicRoutes } from "./components";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className=" relative ">
      <BrowserRouter>
        {loading && (
          <div class="flex items-center justify-center fixed z-40 bg-black/60 w-full h-full">
            <div
              class="inline-block h-20 w-20 text-white animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
            <span className="absolute mt-28 text-2xl font-bold text-white">
              Loading...
            </span>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectorRoutes>
                <Home />
              </ProtectorRoutes>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectorRoutes>
                <ApplyDoctor />
              </ProtectorRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
