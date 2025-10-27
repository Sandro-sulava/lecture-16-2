import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import ThemeToggle from "./ThemeToggle";

// ✅ Navigation Config
const neutralLinks = [
  { name: "Home", path: "/" },
  { name: "Luxury Cars", path: "/luxuryCars" },
];

const privateLinks = [{ name: "Add Car", path: "/add-car" }];

const publicLinks = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const Header = () => {
  const { user, logout, isLoadingAuth, isLoggingOut } = useAuth();

  const handleLogout = () => logout();

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              MyBlog
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {/* Neutral Links (always visible) */}
            {neutralLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Conditionally Rendered Links */}
            {!isLoadingAuth && (
              <>
                {user ? (
                  <>
                    {/* Private Links */}
                    {privateLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-all ${
                            isActive
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}

                    {/* User Info + Logout */}
                    <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.username}
                        </span>
                      </div>

                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Public Links */}
                    {publicLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-all ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </>
                )}
              </>
            )}
          </nav>

          {/* Right Side: Theme Toggle */}
          {/* <div className="flex items-center space-x-3">
            <ThemeToggle />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
