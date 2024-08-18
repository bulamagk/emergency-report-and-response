import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default DashboardPage;
