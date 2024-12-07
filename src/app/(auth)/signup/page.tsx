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
import { useRouter } from "next/navigation";
import B2Home from "@/components/Button/B2Home";

const TextInput = ({ name, ...props }: { label: string; name: string; [key: string]: unknown }) => {
  const [field, meta] = useField(name);
  return (
    <div className="relative w-full mb-2">
      <input
        {...field}
        {...props}
        name={name}
        className={`w-full p-3 py-3 bg-transparent caret-[#fc4747] font-light text-sm text-white border-b-[1px] focus:bg-transparent focus:border-b-2 focus:outline-none ${
          meta.touched && meta.error ? "border-b-[#fc4747]" : "border-b-white"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="absolute right-2 bottom-4 text-[#fc4747] font-light text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const NotificationCard = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-opacity duration-500 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="ml-4 bg-transparent text-white font-medium focus:outline-none"
          onClick={onClose}
        >
         &times;
        </button>
      </div>
    </div>
  );
};

const Signup = () => {
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (isLoading) {
    return <Preloader />;
  }

  const handleSignup = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    }) => {
   
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
        const errorData = await response.json();
        setNotification({ message: errorData.error || "Signup failed", type: "error" });
        return;
      }

      setNotification({ message: "Signup successful! Proceed to Login", type: "success" });

   // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 2000);

    } catch (error) {
      setNotification({ message: "Signup request failed", type: "error" });
      return error;
    }

  };    
  

 
  return (
   <div className={`flex flex-col items-center justify-center h-screen bg-[#10141E] text-white ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}>
      {/* Logo */}
      <div className="mb-8 hover:cursor-pointer">
        <Image src={logo} alt="Logo" width={50} height={20} />
      </div>

      {/* Signup Form */}
      <div className="w-96 p-8 sm:bg-[#161D2F] rounded-3xl">
        <h1 className="text-2xl mb-5">Sign Up</h1>
        <Formik
          initialValues={{ firstName:"", lastName:"", email: "", password: "", repeatPassword: "" }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form>
              {/* First Name Input */}
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
              />

              {/* Last Name Input */}
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last Name"
              />

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
                placeholder="Confirm password"
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

        <B2Home/>
       
      </div>

           {/* Notification Card */}
      {notification && (
        <NotificationCard
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

    </div>
  );};

export default Signup;
