import { NavLink, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import FeedBackList from "./components/FeedBackList";
import FeedBackDetails from "./components/FeedBackDetails";

const App = () => {
  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-500 mb-10">
        <NavLink to="/">Submit</NavLink>
        <NavLink to="/feedbacks">Feedbacks</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/feedbacks" element={<FeedBackList />} />
        <Route path="/feedbbacks/:id" element={<FeedBackDetails />} />
      </Routes>
    </div>
  );
};

export default App;
