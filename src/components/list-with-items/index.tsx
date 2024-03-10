import { component$ } from "@builder.io/qwik";
import { Item } from "../item";
import type { ListItem } from "~/lib";

export interface ListWithItemsProps {
  list: ListItem[];
}
export const ListWithItems = component$<ListWithItemsProps>(({ list }) => {
  return (
    <>
      <div>
        {list.map((itemprop: ListItem, i: number) => {
          if (!itemprop.purchased) return <Item key={i} props={itemprop} />;
        })}
      </div>
      <div>
        {list.find((item) => item.purchased) && (
          <h2 class="text-center">Handlet</h2>
        )}

        {list.map((itemprop: ListItem, i: number) => {
          if (itemprop.purchased) return <Item key={i} props={itemprop} />;
        })}
      </div>
    </>
  );
});
