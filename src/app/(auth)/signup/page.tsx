"use client";

import { Formik, Form } from "formik";
import { signupSchema } from "@/utils/validationSchemas";
import AuthButton from "@/components/Button/authButton";
import Image from "next/image";
import logo from "../../../../public/assets/logo.svg";
import { useField } from "formik";
import Link from "next/link";
import Preloader from "@/components/common/Preloader";
import { useEffect, useState } from "react";

const TextInput = ({ name, ...props }: { label: string; name: string; [key: string]: unknown }) => {
  const [field, meta] = useField(name);
  return (
    <div className="relative w-full mb-4">
      <input
        {...field}
        {...props}
        name={name}
        className={`w-full p-3 py-5 bg-transparent caret-[#fc4747] font-light text-sm text-white border-b-[1px] focus:bg-transparent focus:border-b-2 focus:outline-none ${
          meta.touched && meta.error ? "border-b-[#fc4747]" : "border-b-white"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="absolute right-2 bottom-4 text-[#fc4747] font-light text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Signup = () => {

  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    // Simulate loading state
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false); // Hide preloader
      // Add a delay for fade-in
      setTimeout(() => {
        setFadeIn(true); // Trigger fade-in effect
      }, 100); // Delay of 500ms after preloader disappears
    }, 2000); // 2 seconds

    return () => clearTimeout(preloaderTimer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  const handleSignup = async (values: { email: string; password: string; repeatPassword: string }) => {
    console.log("Signup values:", values);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
    console.log("Signup successful");
  };

  return (
   <div className={`flex flex-col items-center justify-center h-screen bg-[#10141E] text-white ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}>
      {/* Logo */}
      <div className="mb-8">
        <Image src={logo} alt="Logo" width={50} height={20} />
      </div>

      {/* Signup Form */}
      <div className="w-96 p-8 sm:bg-[#161D2F] rounded-3xl">
        <h1 className="text-2xl mb-5">Sign Up</h1>
        <Formik
          initialValues={{ email: "", password: "", repeatPassword: "" }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              {/* Email Input */}
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Email address"
              />

              {/* Password Input */}
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />

              {/* Repeat Password Input */}
              <TextInput
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
              />

              {/* Signup Button */}
              <AuthButton
                type="submit"
                disabled={!isValid || isSubmitting || !values.email || !values.password}
                className={`w-full mt-8 flex items-center justify-center bg-[#FC4747] text-white rounded-md transition duration-300 ${
                  isSubmitting
                    ? "cursor-not-allowed bg-opacity-50"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-[#FC4747] rounded-full animate-spin"></span>
                ) : (
                  "Create an Account"
                )}
              </AuthButton>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <div className="text-center mt-5 font-extralight">
          Already have an account? {""}
          <Link href="/login">
          <button className="text-[#fc4747] hover:underline">
             Login
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
