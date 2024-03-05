import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section>
      <div>
        <label
          for="name"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Navn
        </label>
        <input
          type="text"
          name="name"
          id="name"
          class="block h-10 w-full rounded-md border border-gray-200 bg-gray-50 text-center sm:text-sm"
          placeholder="Navn"
          required
        />
      </div>
      <div>
        <label
          for="email"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          class="block h-10 w-full rounded-md border border-gray-200 bg-gray-50 text-center sm:text-sm"
          placeholder="name@mail.no"
          required
        />
      </div>
      <div>
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Passord
        </label>
        <input
          type="password"
          name="password"
          id="password"
          class="block h-10 w-full rounded-md border border-gray-200 bg-gray-50 text-center sm:text-sm"
          required
        />
      </div>
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
    </section>
  );
});
