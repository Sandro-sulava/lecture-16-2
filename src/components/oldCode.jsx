import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  username: z
    .string()
    .min(1, "მინიმუმ 1 სიმბოლო უნდა გამოიყენო")
    .max(20, "მაქსიმუმ 20 სიმბოლო უნდა გამოიყენო"),
  lastname: z
    .string()
    .min(1, "მინიმუმ 1 სიმბოლო უნდა გამოიყენო")
    .max(20, "მაქსიმუმ 20 სიმბოლო უნდა გამოიყენო"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      username: "",
      lastname: "",
    },
  });

  const formSubmit = (data) => {
    console.log("Form Data : ", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2x1 font-bold mb-4">register</h2>

        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div>
            <p>
              {errors.username && (
                <span className="text-red-500 text-xs italic">
                  {errors.username.message}
                </span>
              )}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            lastname
          </label>
          <input
            type="text"
            id="lastname"
            {...register("lastname")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <div>
            <p>
              {errors.lastname && (
                <span className="text-red-500 text-xs italic">
                  {errors.lastname.message}
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          register
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default RegisterForm;
