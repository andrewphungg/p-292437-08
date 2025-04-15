
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50">
      <div className="text-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-indigo-100 max-w-md">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-indigo-600">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-3 text-gray-900">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
        </p>
        
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link to="/" className="flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
