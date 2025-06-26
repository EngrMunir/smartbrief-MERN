import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//   const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    // const toastId = toast.loading("Logging in...");
    // try {
    //   const res = await login({
    //     email: data.email,
    //     password: data.password,
    //   }).unwrap();

    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user, token: res.data.accessToken }));

    //   toast.success("Logged in", { id: toastId, duration: 2000, position: "top-center" });
    //   navigate("/");
    // } catch (err) {
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>
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
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
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
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
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
