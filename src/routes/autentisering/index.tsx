import { component$ } from "@builder.io/qwik";
import { OAuthComponent } from "~/components";
export default component$(() => {
  interface Provider {
    name: string;
    imageUrl: string;
  }
  const providers: Provider[] = [
    {
      name: "google",
      imageUrl:
        "https://tailus.io/sources/blocks/social/preview/images/google.svg",
    },
    {
      name: "github",
      imageUrl:
        "https://imgs.search.brave.com/tImca2VIIdOco6cvCipn5tWDw7_ZjWmGEHqOgzC5_YY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvMjUvMjUyMzEu/cG5n",
    },
    {
      name: "spotify",
      imageUrl:
        "https://imgs.search.brave.com/2POG5ZGFWQNCEVuRe_Xk1DW7HBiOas-v2tJZECKabE8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3Nwb3RpZnkt/bG9nby1wbmctb3Bl/bi0yMDAwLnBuZw",
    },
  ];
  return (
    <section class="mt-5 flex flex-col gap-3">
      <a
        class="border-gra mx-auto  flex  h-12 w-3/4  place-content-center rounded-sm border border-gray-200 shadow-sm"
        href="/autentisering/registrer"
      >
        <span class="my-auto text-lg">Email & passord</span>
      </a>
      {providers.map((provider: Provider, i: number) => (
        <OAuthComponent
          key={i}
          provider={provider.name}
          imageUrl={provider.imageUrl}
        />
      ))}
    </section>
  );
});
