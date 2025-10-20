import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { json } from "zod";

const feedbackSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(99, "First name too long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(99, "Last name too long"),

  email: z
    .email("Invalid email address")
    .refine((value) => value !== "tester@example.com", {
      message: "This email is reserved, please use another",
    })
    .refine(
      (value) => {
        const domain = value.split("@")[1];
        const blacklist = [
          "baddomain.com",
          "bademail.com",
          "mail.ru",
          "test.ru",
        ];
        return !blacklist.includes(domain);
      },
      { message: "Blacklisted email domain" }
    ),

  phoneNumber: z
    .string()
    .min(7, "Phone number too short")
    .max(20, "Phone number too long")
    .regex(/^\+?[0-9\s-]+$/, "Invalid phone number format"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),
});

const RegisterForm = () => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server errors : ${res.status}`);
        }
        return res.json();
      })
      .then((responseData) => {
        console.log("Succesfully submited", responseData);
      })
      .catch((err) => {
        console.error(`Submition failed ${err}`);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Send Feedback</h2>

        {/* First Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            {...register("description")}
            className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
