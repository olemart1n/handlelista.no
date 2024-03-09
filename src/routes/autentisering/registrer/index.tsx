import { type QRL, component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { type SubmitHandler } from "@modular-forms/qwik";

import { useForm, valiForm$, setError } from "@modular-forms/qwik";
import { RegisterSchema, type RegisterForm } from "~/lib/valibot";

export default component$(() => {
  const nav = useNavigate();
  const [RegisterForm, { Form, Field }] = useForm<RegisterForm>({
    loader: { value: { email: "", password: "", name: "" } },
    validate: valiForm$(RegisterSchema),
  });
  // ...
  const register: QRL<SubmitHandler<RegisterForm>> = $(async (form) => {
    const { name, email, password } = form;

    const res = await fetch(
      import.meta.env.PUBLIC_SERVER_URL + "/v1/auth/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      },
    );
    if (res.ok) {
      nav("/status", {
        replaceState: true,
        forceReload: true,
      });
    } else {
      const json = await res.json();
      const errors = json.error;

      Object.keys(errors).forEach((key) => {
        setError(
          RegisterForm,
          key as "email" | "password" | "name",
          errors[key],
        );
      });

      // noinspection ExceptionCaughtLocallyJS
      throw new Error(
        "Sorry, there was an error when logging in. Refresh the page and try again.",
      );
    }
  });
  return (
    <Form onSubmit$={register}>
      <h2 class="text-center text-lg ">Registrer deg</h2>
      <h3 class="my-10 bg-green-200 text-center text-lg underline">
        Du kan bruke fiktiv email, navn og passord !
      </h3>
      <Field name="name">
        {(field, props) => (
          <div class="mb-5">
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-900"
            >
              Navn
            </label>
            <input
              {...props}
              value={field.value}
              placeholder="Navn"
              type="name"
              name="name"
              autoFocus
              id="name"
              class={[
                "block h-10 w-full rounded-md border border-gray-200 bg-gray-50 text-center sm:text-sm",
                field.error
                  ? "border-red-600"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              ]}
            />
            {field.error && (
              <p class="mt-2 text-sm text-red-600 ">{field.error}</p>
            )}
          </div>
        )}
      </Field>
      <Field name="email">
        {(field, props) => (
          <div class="mb-5">
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              {...props}
              value={field.value}
              type="email"
              name="email"
              placeholder="eksempel@mail.no"
              autoFocus
              id="email"
              class={[
                "block h-10 w-full rounded-md border border-gray-200 bg-gray-50 text-center sm:text-sm",
                field.error
                  ? "border-red-600"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              ]}
            />
            {field.error && (
              <p class="mt-2 text-sm text-red-600">{field.error}</p>
            )}
          </div>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <div class="mb-5">
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 "
            >
              Passord
            </label>
            <input
              {...props}
              value={field.value}
              type="password"
              name="password"
              placeholder="passord"
              autoFocus
              id="password"
              class={[
                "block h-10 w-full rounded-md border border-gray-200 bg-gray-50 text-center sm:text-sm",
                field.error
                  ? "border-red-600"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              ]}
            />
            {field.error && (
              <p class="mt-2 text-sm text-red-600 ">{field.error}</p>
            )}
          </div>
        )}
      </Field>

      <div class="w-full">
        <button
          type="submit"
          class="mx-auto my-2 block rounded-sm border border-gray-200 bg-gray-100 px-4 py-1 text-lg shadow-md"
        >
          Registrer
        </button>
      </div>

      <p class="py-4 text-center">
        Har du bruker?{" "}
        <a href="/autentisering/logg-inn" class="underline">
          Logg inn
        </a>
      </p>
    </Form>
  );
});
