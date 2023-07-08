"use client";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// import { DevTool } from "@hookform/devtools";
// This fixes the hydration error due to devtools
const DevTool: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const PromptForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Batman",
        email: data.email,
        channel: "StarPlus",
      };
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  return (
    <div className="bg-slate-300 flex flex-col w-3/6 gap-2 px-4 py-4 rounded-md">
      <h1 className="self-center">Prompt Form</h1>

      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="username">Username</label>
        <input
          className="rounded-sm"
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
        />
        <p className="text-red-600">{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          className="rounded-sm"
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue != "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p className="text-red-600">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          className="rounded-sm"
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "channel is required",
            },
          })}
        />
        <p className="text-red-600">{errors.channel?.message}</p>

        <button className="rounded-sm bg-blue-300 ">Submit</button>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default PromptForm;
