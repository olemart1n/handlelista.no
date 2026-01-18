import {
    component$,
    useSignal,
    $,
    useStylesQrl,
    useStylesScoped$,
} from '@builder.io/qwik'
import { LuCheck, LuLoader2 } from '@qwikest/icons/lucide'
import { type Cookie, server$ } from '@builder.io/qwik-city'
import type { List } from '~/lib/definitions'
import { insertNewList } from '~/lib/turso'
import { addListToCookies } from '~/lib'
import { v4 } from 'uuid'
import styles from './index.css?inline'

interface CreateListProps {
    list: List[]
}

const tursoInsertNewList = server$(async function (title) {
    title
    const newId = v4()
    const res = await insertNewList(this.env, newId, title)

    const value = { id: newId, title: title }
    addListToCookies(this.cookie as Cookie, value)
    return res as List
})

export const CreateListForm = component$<CreateListProps>(({ list }) => {
    useStylesScoped$(styles)
    const title = useSignal('')
    const isLoading = useSignal(false)
    const submitList = $(() => {
        isLoading.value = true
        tursoInsertNewList(title.value)
            .then((data) => list.push(data))
            .then(() => {
                title.value = ''
                isLoading.value = false
            })
    })
    return (
        <form preventdefault:submit onsubmit$={submitList}>
            <input
                bind:value={title}
                type="text"
                name="title"
                id="title"
                placeholder="Navn på liste"
                minLength={3}
            />

            <button
                class={title.value.length > 2 ? 'button-active' : ''}
                disabled={title.value.length < 2}
            >
                {isLoading.value ? (
                    <LuLoader2 class="icon spin" />
                ) : (
                    <LuCheck class="icon" />
                )}
            </button>
        </form>
    )
})
