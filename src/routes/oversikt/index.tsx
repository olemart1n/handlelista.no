import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link, routeLoader$ } from '@builder.io/qwik-city'
import { selectAllLists } from '~/lib/turso/select'

export const useTursoGetLists = routeLoader$(async (reqEv) => {
    const res = await selectAllLists(reqEv.env)

    return { count: res?.length, lists: res }
})

export default component$(() => {
    const lists = useTursoGetLists()

    return (
        <main>
            <h1>Antall lister: {lists.value.count} </h1>
            <div>
                {lists.value.lists?.map((list) => (
                    <Link key={list.id} href={'/liste/' + list.id}>
                        {list.title}
                    </Link>
                ))}
            </div>
        </main>
    )
})
