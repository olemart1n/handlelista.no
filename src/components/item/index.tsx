import { component$, $, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import { type ListItem } from '~/lib'
import { LuCheck, LuCheckCheck, LuTrash2 } from '@qwikest/icons/lucide'
import { deleteItem, updateItemIsPurchased } from '~/lib/turso'
import { server$ } from '@builder.io/qwik-city'
import styles from './index.css?inline'
export interface ItemProps {
    props: ListItem
}

const tursoTogglePurchased = server$(async function (itemId) {
    const res = await updateItemIsPurchased(this.env, itemId)
    return res
})

const tursoDeleteItem = server$(async function (itemId) {
    const res = await deleteItem(this.env, itemId)

    return res
})

export const Item = component$<ItemProps>(({ props }) => {
    useStylesScoped$(styles)
    const purchase = $(() => {
        tursoTogglePurchased(props.id)
        props.purchased = true
    })
    const divEl = useSignal<HTMLDivElement>()
    return (
        <div ref={divEl} class="item-container">
            <div class="item-content">
                <button
                    class="delete-button"
                    onClick$={() => {
                        tursoDeleteItem(props.id).then((data) => {
                            data === 'Deleted' && divEl.value?.remove()
                        })
                    }}
                >
                    <LuTrash2 class="icon" />
                </button>
                <div class="item-name-container">
                    <h5 class="item-name">{props.name}</h5>
                </div>
                {props.purchased ? (
                    <button class="purchased-button" disabled>
                        <LuCheckCheck class="icon" />
                    </button>
                ) : (
                    <button class="purchase-button" onClick$={purchase}>
                        <LuCheck class="icon" />
                    </button>
                )}
            </div>
        </div>
    )
})
