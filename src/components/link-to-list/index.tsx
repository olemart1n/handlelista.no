import {
    component$,
    useSignal,
    useStyles$,
    useStylesScoped$,
} from '@builder.io/qwik'
import type { List } from '~/lib'
import {
    LuLoader2,
    LuTrash2,
    LuCopy,
    LuCheck,
    LuShare,
} from '@qwikest/icons/lucide'
import { Link, server$ } from '@builder.io/qwik-city'
import styles from './index.css?inline'

const removeLink = server$(function (id: string) {
    const lists = this.cookie.get('lists')
        ? this.cookie.get('lists')
        : undefined
    if (!lists) return
    this.cookie.delete('lists')
    const parsed: List[] = JSON.parse(lists.value)
    const indexToRemove = parsed.findIndex((obj) => obj.id === id)
    if (indexToRemove !== -1) {
        parsed.splice(indexToRemove, 1)
    }
    this.cookie.set('lists', JSON.stringify(parsed), {
        path: '/',
        expires: new Date('9999-12-31T23:59:59'),
    })
    return { ok: true }
})

export const LinkToList = component$<List>(({ id, title }) => {
    useStylesScoped$(styles)
    const isNavigating = useSignal(false)
    const divEl = useSignal<HTMLDivElement>()
    const isCopied = useSignal(false)
    return (
        <div ref={divEl} key={id} class="link-to-list">
            <button
                class="trash-button"
                onClick$={() =>
                    removeLink(id).then((ok) => ok && divEl.value?.remove())
                }
            >
                <LuTrash2 class="trash-icon" />
            </button>

            <div>
                {isCopied.value ? (
                    <div class="copied-container">
                        <LuCopy class="copied-icon" />{' '}
                        <LuCheck class="check-icon" />
                    </div>
                ) : (
                    <button
                        class="share-button"
                        onClick$={async () => {
                            try {
                                await navigator.share({
                                    title: 'Handlelista.no',
                                    text: 'Bli med på handlelista',
                                    url: 'https://handlelista.no/liste/' + id,
                                })
                            } catch {
                                isCopied.value = true
                                navigator.clipboard.writeText(
                                    'https://handlelista.no/liste/' + id,
                                )
                            }
                        }}
                    >
                        <LuShare class="share-icon" />
                    </button>
                )}
            </div>

            <Link
                onClick$={() => (isNavigating.value = !isNavigating.value)}
                href={`/liste/${id}`}
                style={{ flex: 1, padding: 6 }}
            >
                {/* {title} */}
                hello there
            </Link>

            <LuLoader2
                class={
                    'loader ' + (isNavigating.value ? 'visible' : 'invisible')
                }
            />
        </div>
    )
})
