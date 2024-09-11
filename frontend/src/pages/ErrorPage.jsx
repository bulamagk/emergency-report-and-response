import { useNavigate, useRouteError } from "react-router-dom";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ErrorPage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // If no user return to homepage
  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, []);
  console.log(user);
  const error = useRouteError();

  toast.error("Your session has expired, please sign in to continue!");
  dispatch(logout());

  return <section className="flex items-center justify-center">Error</section>;
};

export default ErrorPage;
