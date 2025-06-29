import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/features/hook";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser, TUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const demoCredentials = {
    admin: { email: "admin@gmail.com", password: "Admin123" },
    user: { email: "user@gmail.com", password: "Admin123" },
    editor: { email: "editor@gmail.com", password: "Admin123" },
    reviewer: { email: "reviewer@gmail.com", password: "Admin123" },
  };

  const autofill = (role: keyof typeof demoCredentials) => {
    const creds = demoCredentials[role];
    setValue("email", creds.email);
    setValue("password", creds.password);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const token = res.data.accessToken;
      const user = jwtDecode<TUser>(token);
      dispatch(setUser({ user, token }));

      toast.success("Logged in successfully!", {
        id: toastId,
        position: "top-center",
        duration: 2000,
      });

      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>

        {/* Autofill Buttons */}
        <div className="flex flex-wrap justify-between gap-2 mb-4">
          <button
            type="button"
            onClick={() => autofill("admin")}
            className="flex-1 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => autofill("user")}
            className="flex-1 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            User
          </button>
          <button
            type="button"
            onClick={() => autofill("editor")}
            className="flex-1 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => autofill("reviewer")}
            className="flex-1 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Reviewer
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
