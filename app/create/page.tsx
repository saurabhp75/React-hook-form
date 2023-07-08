"use client";
import { useForm } from "react-hook-form";

const PromptForm = () => {
  const form = useForm();
  const { register } = form;
  const { name, ref, onChange, onBlur } = register("username");

  return (
    <div className="bg-slate-300 flex flex-col w-3/6 gap-2 px-4 py-4 rounded-md">
      <h1 className="self-center">Prompt Form</h1>

      <form className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          className="rounded-sm"
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />

        <label htmlFor="email">E-mail</label>
        <input className="rounded-sm" type="email" id="email" name="email" />

        <label htmlFor="channel">Channel</label>
        <input className="rounded-sm" type="text" id="channel" name="channel" />

        <button className="rounded-sm bg-blue-300 ">Submit</button>
      </form>
    </div>
  );
};

export default PromptForm;
