import { component$, useStore, useStyles$ } from '@builder.io/qwik'
import { ListWithItems, AddItemForm } from '~/components'
import { routeLoader$ } from '@builder.io/qwik-city'
import { selectListItems, selectList } from '~/lib/turso/select'
import type { ListItem, List } from '~/lib'
import styles from '../index.css?inline'
export const useTursoGetList = routeLoader$(
    async ({ params, redirect, env, cookie }) => {
        const res = await selectList(env, params.id)
        const id = params['id']
        const cookieList = cookie.get('lists')?.value

        if (!res?.title) {
            throw redirect(307, '/oups/' + id)
        }

        if (!cookie.get('lists')) {
            cookie.set('lists', JSON.stringify([{ id, title: res.title }]), {
                path: '/',
                expires: new Date('9999-12-31T23:59:59'),
            })
            return res as List | null
        }

        const parsed = JSON.parse(cookieList!)
        const exists = parsed.find((obj: List) => obj.id === id)

        if (!exists) {
            parsed.push({ id, title: res.title })
            cookie.delete('lists', { path: '/' })
            cookie.set('lists', JSON.stringify(parsed), {
                path: '/',
                expires: new Date('9999-12-31T23:59:59'),
            })
        }
        return res as List | null
    },
)

export const useTursoGetListItems = routeLoader$(async ({ params, env }) => {
    const res = await selectListItems(env, params.id)
    return res as ListItem[]
})

export default component$(() => {
    useStyles$(styles)
    const list = useTursoGetList()
    const listItems = useTursoGetListItems()
    const listStore = useStore(listItems.value)
    return (
        <main>
            <div class="list-title-container">
                <h2 class="list-title">{list.value?.title}</h2>
            </div>

            <div class="add-item-form-container">
                <AddItemForm list={listStore} />
            </div>
            <div class="list-with-items-container">
                <ListWithItems list={listStore} />
            </div>
        </main>
    )
})
