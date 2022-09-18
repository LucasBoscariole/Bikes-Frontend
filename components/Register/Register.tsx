import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

type FormContext = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const SigninSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required"),
  password_confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const Register = () => {
  const router = useRouter();

  const handleSubmit = async (values: FormContext) => {
    await axios
      .post("/register", values)
      .then((res) => {
        router.push("/login");
      })
      .catch((err) =>
        toast.error(
          err.response.data.email[0]
            .toLowerCase()
            .replace(/\w/, (firstLetter: string) =>
              firstLetter.toUpperCase()
            ) ?? "An error happen!"
        )
      );
  };

  return (
    <main className="mx-auto mt-10 w-96">
      <h1 className="text-3xl">Please Register</h1>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirm: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="first_name"
              type="text"
              className="w-full px-3 py-2 mt-4 mb-0 leading-tight text-gray-700 border rounded shadow appearance-none border-primary focus:outline-none focus:shadow-outline"
              placeholder="First Name"
            />
            {errors.first_name && touched.first_name ? (
              <p className="text-[red] text-sm">{errors.first_name}</p>
            ) : null}
            <Field
              name="last_name"
              type="text"
              className="w-full px-3 py-2 mt-4 mb-0 leading-tight text-gray-700 border rounded shadow appearance-none border-primary focus:outline-none focus:shadow-outline"
              placeholder="Last Name"
            />
            {errors.last_name && touched.last_name ? (
              <p className="text-[red] text-sm">{errors.last_name}</p>
            ) : null}
            <Field
              name="email"
              type="email"
              className="w-full px-3 py-2 mt-4 mb-0 leading-tight text-gray-700 border rounded shadow appearance-none border-primary focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
            {errors.email && touched.email ? (
              <p className="text-[red] text-sm">{errors.email}</p>
            ) : null}

            <Field
              type="password"
              name="password"
              className="w-full px-3 py-2 mt-4 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            {errors.password && touched.password ? (
              <p className="text-[red] text-sm">{errors.password}</p>
            ) : null}

            <Field
              type="password"
              name="password_confirm"
              className="w-full px-3 py-2 mt-4 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Password Confirm"
            />
            {errors.password_confirm && touched.password_confirm ? (
              <p className="text-[red] text-sm">{errors.password_confirm}</p>
            ) : null}

            <button
              type="submit"
              className="flex items-center justify-center h-10 px-6 mt-3 text-white duration-300 border rounded outline-none border-primary bg-primary hover:bg-secondary hover:border-secondary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
