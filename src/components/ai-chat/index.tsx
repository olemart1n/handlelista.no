import { component$, useSignal, useStore } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import { type Prompt1, type List, prompt1 } from "~/lib";
import { LuLoader2 } from "@qwikest/icons/lucide";
import { AiResponse } from "./ai-response";

const askAi = server$(async function () {
  const { data, error } = await prompt1(this.env);
  if (error) {
    return { response: null, error: error };
  }
  const json = await data?.json();
  const response = JSON.parse(json);
  const r = {
    dinner: response.middag,
    ingredients: response.ingredienser,
  } as Prompt1;
  return { response: r, error: null };
});

interface AiChatProps {
  list: List[];
}

export const AiChat = component$<AiChatProps>(({ list }) => {
  const isLoading = useSignal(false);
  const isError = useSignal(false);
  const errorMessage = useSignal("");
  const mealSignal = useStore<Prompt1>({
    dinner: "",
    ingredients: [],
  });

  return (
    <>
      <div class="flex place-content-center">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 90.53 122.88"
          height={70}
          class=""
        >
          <title>Robokokk</title>
          <path d="M62.2,83.36l.21.18a1.42,1.42,0,0,1,.71,0L76.5,87.35c4.11,1.47,7.62,3.41,10.1,6.14a15.17,15.17,0,0,1,3.92,11v16.86A1.54,1.54,0,0,1,89,122.88H1.53A1.54,1.54,0,0,1,0,121.35V106.43A21.19,21.19,0,0,1,2.94,95.61a19.22,19.22,0,0,1,8.33-7.22l.25-.1,15.75-4.42a1.48,1.48,0,0,1,.69,0l.08,0a13.83,13.83,0,0,0,3.59-3.94,20.82,20.82,0,0,0,1.13-2,37.73,37.73,0,0,1-4.23-5.55l-4.44-7a12.87,12.87,0,0,1-2.52-6.44,4.47,4.47,0,0,1,2-4.06,4.76,4.76,0,0,1,1.08-.55,21.14,21.14,0,0,1,.1-3.49,1.65,1.65,0,0,1-.06-.32l-1.27-11c-8.56-3.35-12.63-9-13.47-14.77a16.72,16.72,0,0,1,.76-7.79A19.19,19.19,0,0,1,33.59,4.52c4-3,8.2-4.72,12.49-4.5,3.79.19,7.56,1.86,11.13,5.43A17.35,17.35,0,0,1,76,7.68a19.23,19.23,0,0,1,5.56,7.44,17.31,17.31,0,0,1,1.24,9.23C81.85,30.56,77.31,36.6,67.5,39.9L66.13,50.69a1.87,1.87,0,0,1-.09.41l.46,3.52h0A3.21,3.21,0,0,1,68.84,57c.36,1.4,0,3.35-1.22,6h0a1,1,0,0,1-.07.15l-5.06,8.31a39.58,39.58,0,0,1-4.7,6.35,20.44,20.44,0,0,0,1,1.86,12.7,12.7,0,0,0,3.38,3.61ZM28.45,52.09l.23,5.15a6.89,6.89,0,0,1-1.45-.05h0c-1.61.06-3,.52-2.94,2.32a9.67,9.67,0,0,0,2,4.74l0,0h0l4.22,6.51a30.76,30.76,0,0,0,5.67,6.6,14.08,14.08,0,0,0,8.95,3.16,14.32,14.32,0,0,0,9.42-3.3,32.46,32.46,0,0,0,5.84-7.09l4.76-7.6c.88-2,1.21-3.27,1-4-.42-1.26-3.42-.65-4.44-.78l1-5.36c-10.57-4.35-22-4.32-34.32-.29Zm34.82-6.4,1-7.26A1.71,1.71,0,0,1,65.43,37c9.07-2.76,13.19-7.9,14-13.13a13.88,13.88,0,0,0-1-7.42,15.74,15.74,0,0,0-4.56-6.12A14.15,14.15,0,0,0,57.73,9a1.71,1.71,0,0,1-2.15-.31c-3.18-3.49-6.44-5.1-9.66-5.26C42.28,3.24,38.58,4.87,35,7.71A1.71,1.71,0,0,1,33.49,8a15.75,15.75,0,0,0-16.27,4.36,15.58,15.58,0,0,0-3.32,5.54,13.28,13.28,0,0,0-.61,6.22C14,29,17.66,33.76,25.53,36.55A1.72,1.72,0,0,1,26.66,38l.92,7.72a71.89,71.89,0,0,1,35.69,0ZM31.55,38.08a1.7,1.7,0,0,1,3.32-.75l.91,2.58a1.71,1.71,0,0,1-3.33.75l-.9-2.58ZM27.48,12.16a1.7,1.7,0,0,1,.95,3.27,12.07,12.07,0,0,0-5.62,3.18,9,9,0,0,0-2.24,5.48,1.71,1.71,0,1,1-3.41-.29,12.33,12.33,0,0,1,3.14-7.49,15.32,15.32,0,0,1,7.18-4.15Zm7.78,68.08c-.26.48-.53,1-.81,1.39a19.19,19.19,0,0,1-3.1,3.76,37,37,0,0,0,14.74,3,30.53,30.53,0,0,0,9-1.41,25.05,25.05,0,0,0,3.76-2A16.64,16.64,0,0,1,56,81.55c-.25-.39-.49-.79-.72-1.22-2.63,2.17-5.85,3.09-10.12,3.09s-7.3-1-9.91-3.18ZM43.58,75a.78.78,0,1,1,0-1.55L47,73.3a.78.78,0,0,1,.8.76.77.77,0,0,1-.75.8L43.58,75Zm-.73-10.14a.94.94,0,0,1,.52-1.8c1.87.55,2,.51,3.58-.07l.16-.05a.93.93,0,1,1,.63,1.75l-.16.06c-2.14.77-2.28.82-4.73.11ZM53.2,54.28a2,2,0,1,1-2,2,2,2,0,0,1,2-2Zm-14.88,0a2,2,0,1,1-2,2,2,2,0,0,1,2-2ZM51.8,71a19.61,19.61,0,0,1-2.19.6h0a9.32,9.32,0,0,1-2.11.36,3.14,3.14,0,0,1-1.83-.45,3.3,3.3,0,0,1-.4-.32,3.43,3.43,0,0,1-.41.32,3.14,3.14,0,0,1-1.83.45,9.32,9.32,0,0,1-2.11-.36h0a19.44,19.44,0,0,1-2.18-.6,20.6,20.6,0,0,1-2.06-.83.57.57,0,0,1-.29-.81.63.63,0,0,1,.47-.33h0l.91-.13h0a9.37,9.37,0,0,0,2.34-.54c.22-.09.45-.19.67-.3,1.3-.6,2.71-1.25,4.12-.13a2.56,2.56,0,0,1,.34.31,3.26,3.26,0,0,1,.33-.31c1.41-1.12,2.83-.47,4.12.13.23.11.45.21.68.3a9.26,9.26,0,0,0,2.34.54h0l.91.13h0a.66.66,0,0,1,.48.33.59.59,0,0,1-.29.81A21.61,21.61,0,0,1,51.8,71ZM45.56,91.47l-1,0a30.48,30.48,0,0,1-13.82-3c-1.09-.44-2.17-.94-3.23-1.48L12.46,91.2a16.27,16.27,0,0,0-6.92,6,18.08,18.08,0,0,0-2.48,9.29v13.32H30.94V109.19a16.74,16.74,0,0,1,1.49-7.82,17.8,17.8,0,0,1,5.09-5.87,1.41,1.41,0,0,1,.31-.21l7.74-3.82Zm-.75,20.24a2.51,2.51,0,1,1-2.51,2.51,2.5,2.5,0,0,1,2.51-2.51Zm0-10.45a2.51,2.51,0,1,1-2.51,2.51,2.51,2.51,0,0,1,2.51-2.51Zm10-11a1.12,1.12,0,0,1-.28.18L39.34,98a14.88,14.88,0,0,0-4.15,4.76A13.8,13.8,0,0,0,34,109.17v10.65H87.47V104.46a12.28,12.28,0,0,0-3.13-8.92,21.41,21.41,0,0,0-8.83-5.29L63,86.69a29.18,29.18,0,0,1-8.13,3.59Z" />
        </svg>
        <p class=" my-auto h-fit rounded bg-amber-300 p-1 text-center">
          Spør Robokokk
        </p>
      </div>
      <div>
        <div class="my-2 mb-0 text-center">
          <button
            class="my-1 h-fit w-3/4 rounded-md bg-blue-300 p-1"
            onClick$={() => {
              isLoading.value = true;
              askAi().then((data) => {
                if (data.response) {
                  mealSignal.ingredients = data.response.ingredients;
                  mealSignal.dinner = data.response.dinner;
                  isLoading.value = false;
                } else {
                  errorMessage.value = JSON.stringify(data.error.message);
                  isError.value = true;
                }
              });
            }}
          >
            Forslag til middag
          </button>
        </div>
        <LuLoader2
          class={
            "mx-auto my-auto block h-8 w-8 animate-spin text-gray-600 " +
            (isLoading.value ? "visible" : "invisible")
          }
        />
      </div>
      {isError.value && (
        <p class="w-full bg-red-300 p-3 text-center">{errorMessage.value}</p>
      )}
      {mealSignal.ingredients.length > 0 && (
        <AiResponse list={list} store={mealSignal} />
      )}
    </>
  );
});
