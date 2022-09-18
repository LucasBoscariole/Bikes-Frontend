import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

type FormContext = {
  email: string;
  password: string;
};

type ResponseType = {
  token: string;
};

const SignupSchema = Yup.object().shape({
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
});

export const Login = () => {
  const router = useRouter();

  const handleSubmit = async (values: FormContext) => {
    await axios
      .post<ResponseType>("/login", values, {
        withCredentials: true,
      })
      .then((res: any) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err)
        toast.error(
          err.response.data?.detail
            .toLowerCase()
            .replace(/\w/, (firstLetter: string) =>
              firstLetter.toUpperCase()
            ) ?? "An error happen!"
        );
      });
  };

  return (
    <main className="mx-auto mt-10 w-96">
      <h1 className="text-3xl">Please Log In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
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
            <div className="mb-3">
              <Link href="/forgot" passHref>
                <a className="underline text-secondary">Forgot Password</a>
              </Link>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full h-10 mt-3 text-white duration-300 border rounded outline-none border-primary bg-primary hover:bg-secondary hover:border-secondary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
