import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hook";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "admin") navigate("/dashboard/admin/users");
    else if (user?.role === "editor") navigate("/dashboard/editor");
    else if (user?.role === "user") navigate("/dashboard/user");
    else if (user?.role === "reviewer") navigate("/dashboard/reviewer");
    else navigate("/");
  }, [user, navigate]);

  return null; 
};

export default Dashboard;
