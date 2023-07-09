"use client";
import { useForm, useFieldArray } from "react-hook-form";
import dynamic from "next/dynamic";
import { useEffect } from "react";
// import { DevTool } from "@hookform/devtools";
// This fixes the hydration error due to devtools
const DevTool: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const PromptForm = () => {
  // getValues does not re-render form or subscribe to
  // input changes
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
      age: 0,
      dob: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleGetValues = () => {
    console.log("Get values", getValues(["username", "channel"]));
  };

  // const watchForm = watch();

  renderCount++;
  return (
    <div className="bg-slate-300 flex flex-col w-3/6 gap-2 px-4 py-4 rounded-md">
      <h1 className="self-center">Prompt Form ({renderCount / 2})</h1>
      {/* <h2 className="self-center">
        Watched value: {JSON.stringify(watchForm)}
      </h2> */}

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
            required: {
              value: true,
              message: "email is required",
            },
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

        <label htmlFor="twitter">Twitter</label>
        <input
          className="rounded-sm"
          type="text"
          id="twitter"
          {...register("social.twitter", {
            required: {
              value: true,
              message: "Twitter is required",
            },
          })}
        />
        <p className="text-red-600">{errors.social?.twitter?.message}</p>

        <label htmlFor="facebook">Facebook</label>
        <input
          className="rounded-sm"
          type="text"
          id="facebook"
          {...register("social.facebook", {
            required: {
              value: true,
              message: "Facebook is required",
            },
          })}
        />
        <p className="text-red-600">{errors.social?.facebook?.message}</p>

        <label htmlFor="primary-phone">Primary phone number</label>
        <input
          className="rounded-sm"
          type="text"
          id="primary-phone"
          {...register("phoneNumbers.0", {
            required: {
              value: true,
              message: "Primary phone number is required",
            },
          })}
        />
        <p className="text-red-600">{errors.phoneNumbers?.[0]?.message}</p>

        <label htmlFor="secondary-phone">Secondary phone number</label>
        <input
          className="rounded-sm"
          type="text"
          id="secondary-phone"
          {...register("phoneNumbers.1")}
        />

        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <label htmlFor="age">Age</label>
        <input
          className="rounded-sm"
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "age is required",
            },
          })}
        />
        <p className="text-red-600">{errors.age?.message}</p>

        <label htmlFor="dob">Channel</label>
        <input
          className="rounded-sm"
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "Date of birth is required",
            },
          })}
        />
        <p className="text-red-600">{errors.dob?.message}</p>

        <button className="rounded-sm bg-blue-300 ">Submit</button>
        <button
          className="rounded-sm bg-blue-300 "
          type="button"
          onClick={handleGetValues}
        >
          Get values
        </button>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default PromptForm;
