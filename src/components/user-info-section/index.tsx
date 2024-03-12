import { component$ } from "@builder.io/qwik";
import type { User } from "~/lib";
interface UserInfoSection {
  props: User;
}

export const UserInfoSection = component$<UserInfoSection>(({ props }) => {
  return (
    <div class="mx-auto flex w-full justify-around border-b-2 p-1 dark:text-slate-50 lg:w-1/2 lg:border-none">
      <section>
        <h1 class="mt-2 text-xl">{props.name}</h1>
        <h2 class="mb-2 ">{props.email}</h2>
      </section>
      <img
        src={
          props.avatar
            ? props.avatar
            : "https://imgs.search.brave.com/MBO8j3m04uuveyvzSCslv0TPmyesyzQaR_OX2fTtHl0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9wcm9maWxl/LTItaWNvbi0yNTZ4/MjU2LWJ2aDd4d3lm/LnBuZw"
        }
        alt="profile image"
        height={70}
        width={70}
        class="rounded-sm"
      />
    </div>
  );
});
