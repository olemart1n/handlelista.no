import { component$ } from "@builder.io/qwik";
export interface OAuthComponentProps {
  provider: string;
  imageUrl: string;
}

export const OAuthComponent = component$<OAuthComponentProps>(
  ({ provider, imageUrl }) => {
    const providerCapitalized =
      provider[0].toUpperCase() + provider.substring(1);
    return (
      <a
        href={import.meta.env.PUBLIC_SERVER_URL + "/v1/auth/" + provider}
        class="mx-auto flex  w-3/4 justify-around  rounded-md border border-gray-200 p-1 shadow-sm "
      >
        {" "}
        <img
          src={imageUrl}
          class=" mx-3 my-auto "
          alt="google logo"
          height={40}
          width={40}
        />
        <span class="my-auto">{providerCapitalized}</span>
      </a>
    );
  },
);
