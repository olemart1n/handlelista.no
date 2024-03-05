import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
export interface OAuthComponentProps {
  provider: string;
  imageUrl: string;
}

export const OAuthComponent = component$<OAuthComponentProps>(
  ({ provider, imageUrl }) => {
    const providerCapitalized =
      provider[0].toUpperCase() + provider.substring(1);
    return (
      <Link
        href={import.meta.env.PUBLIC_SERVER_URL + "/v1/auth/" + provider}
        class="mx-auto flex  w-3/4  place-content-center rounded-md border border-gray-200 shadow-sm "
      >
        {" "}
        <img
          src={imageUrl}
          class="  mx-3 my-auto w-16"
          alt="google logo"
          height={50}
          width={50}
        />
        <span class="my-auto">{providerCapitalized}</span>
      </Link>
    );
  },
);
