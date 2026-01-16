import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { CreateListForm, LinkToList } from '~/components'
import type { List } from '~/lib'
import styles from './index.css?inline'

export const useStoredLists = routeLoader$((reqEv) => {
    const lists = reqEv.cookie.get('lists')
        ? reqEv.cookie.get('lists')
        : undefined
    if (!lists) {
        return [] as List[]
    }
    return JSON.parse(lists.value) as List[]
})

export default component$(() => {
    useStylesScoped$(styles)
    const routeData = useStoredLists()
    const lists = useStore(routeData.value)
    return (
        <main>
            <div>
                <CreateListForm list={lists} />
            </div>
            <div>
                {lists.map((list: List) => (
                    <LinkToList key={list.id} id={list.id} title={list.title} />
                ))}
            </div>
        </main>
        //     <>

        //         {/* <div class="chat-container">
        //     <AiChat list={lists} />
        //   </div> */}
        //     </>
    )
})

export const head: DocumentHead = {
    title: 'Handlelista',
    meta: [
        {
            name: 'description',
            content:
                'Bruk handlelista.no for å ha oversikt over det du handler. Legg til varer og merk av varer som er handlet for å ha oversikt.',
        },
        {
            name: 'title',
            content: 'handlelista',
        },
        {
            name: 'keywords',
            content:
                'handleliste, liste, handle, oversikt, handleliste app, handle app, handle norge, norsk',
        },
        {
            name: 'author',
            content: 'Ole Martin Snoen',
        },
        {
            name: 'robots',
            content: 'index',
        },
        {
            name: 'viewport',
            content:
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
    ],
}
