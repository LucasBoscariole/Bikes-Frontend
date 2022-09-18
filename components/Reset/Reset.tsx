import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";

type FormContext = {
  password: string;
  password_confirm: string;
};

const ResetSchema = Yup.object().shape({
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

export const Reset = () => {
 const router = useRouter();
 const { token } = router.query
  const [message, setMessage] = useState("");

  const handleSubmit = async (values: FormContext) => {
    await axios
      .post("/reset", {
        token,
        password: values.password,
        password_confirm: values.password_confirm,
      })
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        setMessage(err.response.data.detail);
      });
  };
  return (
    <main className="mx-auto mt-10 w-96">
      <h1 className="text-3xl">Reset Password</h1>
      <Formik
        initialValues={{
          password: "",
          password_confirm: "",
        }}
        validationSchema={ResetSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
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
            {message !== "" ? (
              <p className="text-[red] text-sm">{message}</p>
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