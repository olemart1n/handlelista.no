import { Slot, component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { type RequestHandler, Link } from '@builder.io/qwik-city'

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 3,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 0,
    })
}
export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    }
})

export default component$(() => {
    return (
        <>
            <header>
                <nav>
                    <Link href="/">
                        <h1>handlelista.no</h1>
                    </Link>
                    <button>Forslag til middag</button>
                </nav>
            </header>

            <Slot />
        </>
    )
})
