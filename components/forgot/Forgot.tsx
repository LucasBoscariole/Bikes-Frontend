import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type FormContext = {
  email: string;
};
const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required("Email is required"),
});
export const Forgot = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (values: FormContext) => {
    try {
      await axios.post("/forgot", values)
      setMessage("Please, check your inbox!");
    } catch (error) {
      setMessage("An error occurred!");
    }
  };
  return (
    <>
      <main className="mx-auto mt-10 w-96">
        <h1 className="text-3xl">Type your email</h1>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ForgotSchema}
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
              {message !== "" ? (
                <p className="text-[green] text-sm">{message}</p>
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
    </>
  );
};
