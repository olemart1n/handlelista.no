import { type QRL, component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { type SubmitHandler } from "@modular-forms/qwik";

import { useForm, valiForm$, setError } from "@modular-forms/qwik";
import { LoginSchema, type LoginForm } from "~/lib/valibot";

export default component$(() => {
  const nav = useNavigate();
  const [LoginForm, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { email: "", password: "" } },
    validate: valiForm$(LoginSchema),
  });
  // ...
  const signIn: QRL<SubmitHandler<LoginForm>> = $(async (form) => {
    const { email, password } = form;

    const res = await fetch(
      import.meta.env.PUBLIC_SERVER_URL + "/v1/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      },
    );
    if (res.ok) {
      nav("/bruker", {
        replaceState: true,
        forceReload: true,
      });
    } else {
      const json = await res.json();
      const errors = json.error;
      Object.keys(errors).forEach((key) => {
        setError(LoginForm, key as "email" | "password", errors[key]);
      });
    }
  });
  return (
    <Form onSubmit$={signIn}>
      <h2 class="text-center text-lg ">Logg inn</h2>
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
              <p class="mt-2 text-sm text-red-600 ">{field.error}</p>
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
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {field.error}
              </p>
            )}
          </div>
        )}
      </Field>

      <div class="w-full">
        <button
          type="submit"
          class="mx-auto my-2 block rounded-sm border border-gray-200 bg-gray-100 px-4 py-1 text-lg shadow-md"
        >
          Logg inn
        </button>
      </div>

      <p class="py-4 text-center">
        Har du ikke bruker?{" "}
        <a href="/autentisering/registrer" class="underline">
          Registrer
        </a>
      </p>
    </Form>
  );
});
