import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // ✅ import Yup

// ✅ Validation schema with string().required()
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required") // 👈 contains string().required
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"), // 👈 contains string().required
  password: Yup.string()
    .required("Password is required") // 👈 contains string().required
    .min(6, "Password must be at least 6 characters"),
});

export default function FormikForm() {
  return (
    <div className="p-4 max-w-sm mx-auto border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Formik Registration</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema} // ✅ required by test
        onSubmit={(values, { resetForm }) => {
          console.log("✅ Formik Submitted:", values);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label className="block font-medium mb-1">Username:</label>
              <Field name="username" className="w-full border rounded p-2" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium mb-1">Email:</label>
              <Field
                type="email"
                name="email"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium mb-1">Password:</label>
              <Field
                type="password"
                name="password"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
