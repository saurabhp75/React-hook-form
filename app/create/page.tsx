"use client";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// import { DevTool } from "@hookform/devtools";
// This fixes the hydration error due to devtools
const DevTool: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

const PromptForm = () => {
  const form = useForm();
  const { register, control } = form;

  return (
    <div className="bg-slate-300 flex flex-col w-3/6 gap-2 px-4 py-4 rounded-md">
      <h1 className="self-center">Prompt Form</h1>

      <form className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          className="rounded-sm"
          type="text"
          id="username"
          {...register("username")}
        />

        <label htmlFor="email">E-mail</label>
        <input
          className="rounded-sm"
          type="email"
          id="email"
          {...register("email")}
        />

        <label htmlFor="channel">Channel</label>
        <input
          className="rounded-sm"
          type="text"
          id="channel"
          {...register("channel")}
        />

        <button className="rounded-sm bg-blue-300 ">Submit</button>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default PromptForm;
