
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-sunset-purple/10 to-sunset-pink/20">
      <div className="text-center bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-sunset-purple/20 max-w-md">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! This page doesn't exist</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-sunset-purple text-white rounded-lg hover:bg-sunset-purple/90 transition-colors shadow-md"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
