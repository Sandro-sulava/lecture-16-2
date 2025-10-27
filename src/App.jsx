import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Header from "./component/Header";
import LuxuryCarPage from "./pages/LuxuryCarPage";
import LuxuryCarDetails from "./pages/LuxuryCarDetails";
import CreateLuxuryCar from "./pages/CreateLuxuryCar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-noto">
      <Header />
      <main className="max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route path="/luxuryCars" element={<LuxuryCarPage />} />

          <Route path="/luxuryCars/:id" element={<LuxuryCarDetails />} />

          <Route
            path="/add-car"
            element={
              <PrivateRoute>
                <CreateLuxuryCar />
              </PrivateRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="text-center">
                <h1 className="text-3xl font-bold">404 Not Found</h1>
                <p className="text-gray-500">
                  The page you are looking for does not exist.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
