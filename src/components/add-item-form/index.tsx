import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import { LuPlus, LuCheck } from '@qwikest/icons/lucide'
import type { ListItem } from '~/lib'
import { server$ } from '@builder.io/qwik-city'
import { insertNewItem } from '~/lib/turso'
import styles from './index.css?inline'

interface ListInputProps {
    list: ListItem[]
}

const tursoInsertItem = server$(async function (name) {
    const id = this.params['id']
    const res = await insertNewItem(this.env, id, name)
    if (res) {
        return res
    }
})

export const AddItemForm = component$<ListInputProps>(({ list }) => {
    useStylesScoped$(styles)
    const title = useSignal('')
    const focusOutHiddenBtn = useSignal<HTMLButtonElement>()
    return (
        <form
            preventdefault:submit
            onsubmit$={() => {
                if (title.value.length < 3) return
                tursoInsertItem(title.value).then((data) => {
                    if (!data) return
                    list.push(data)
                    title.value = ''
                    focusOutHiddenBtn.value?.focus()
                })
            }}
        >
            <input
                bind:value={title}
                type="text"
                name="item"
                maxLength={20}
                id="item"
            ></input>
            <button
                ref={focusOutHiddenBtn}
                class="hidden-button"
                type="button"
            ></button>
            <button
                class={'button ' + (title.value.length > 2 && 'button-active')}
            >
                {title.value.length > 2 ? (
                    <LuCheck
                        class="icon"
                        aria-hidden="true"
                        focusable="false"
                    />
                ) : (
                    <LuCheck
                        class="icon"
                        aria-hidden="true"
                        focusable="false"
                    />
                )}
            </button>
        </form>
    )
})
