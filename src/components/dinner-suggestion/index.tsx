import { component$, useStore, useStyles$ } from '@builder.io/qwik'
import { Modal, Label } from '@qwik-ui/headless'
import styles from './index.css?inline'
import {
    server$,
    useLocation,
    useNavigate,
    type Cookie,
} from '@builder.io/qwik-city'
import {
    addListToCookies,
    insertManyItems,
    insertNewList,
    selectDinnerSuggestion,
} from '~/lib'
import type { ParsedDinnerSuggestion } from '~/lib'
import { LuX } from '@qwikest/icons/lucide'
import { v4 } from 'uuid'
const tursoGetDinnerSuggestion = server$(async function () {
    const res = await selectDinnerSuggestion(this.env)
    if (res) {
        return res
    }
})

const tursoInsertNewList = server$(async function (title, ingredients) {
    const message = { error: true, message: 'Problem' }
    const newId = v4()
    const res = await insertNewList(this.env, newId, title)

    if (!res) {
        return message
    }

    const value = { id: newId, title: title }
    addListToCookies(this.cookie as Cookie, value)
    const success = await insertManyItems(this.env, res.id, ingredients)

    if (success) {
        message.error = false
        message.message = newId
    }
    return message
})

export const DinnerSuggestion = component$(() => {
    useStyles$(styles)
    const loc = useLocation()
    const nav = useNavigate()
    const store = useStore<ParsedDinnerSuggestion>({
        name: '',
        ingredients_json: [],
        base_portions: 0,
        preparation: '',
        id: 0,
    })
    return (
        <>
            <Modal.Root class="modal-root">
                <Modal.Trigger
                    class="modal-trigger"
                    onClick$={() =>
                        tursoGetDinnerSuggestion().then((data) => {
                            console.log(data)
                            store.name = data?.name as string
                            store.ingredients_json = data!.ingredients_json
                        })
                    }
                >
                    Middagsforslag
                </Modal.Trigger>
                <Modal.Panel class="modal-panel">
                    <div class="header">
                        <Modal.Title>Middagsforslag</Modal.Title>
                        <Modal.Close class="cancel" type="submit">
                            <LuX />
                        </Modal.Close>
                    </div>
                    <Modal.Description>{store.name}</Modal.Description>

                    <ul>
                        {store.ingredients_json.map((i, index) => (
                            <li key={index}>
                                {i.name}{' '}
                                <span>
                                    {i.amount} {i.unit}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <footer>
                        <Modal.Close
                            class="modal-close"
                            onClick$={() => {
                                if (loc.url.origin.includes('liste')) {
                                    // ADD INGREDIENTS TO ALREADY EXISTING LIST
                                } else {
                                    // CREATE A NEW LIST WITH THE DINNERNAME AND INSERT INGREDIENTS

                                    tursoInsertNewList(
                                        store.name,
                                        store.ingredients_json,
                                    ).then((message) => {
                                        nav(
                                            loc.url.origin +
                                                '/liste/' +
                                                message.message,
                                        )
                                    })
                                }
                            }}
                        >
                            {loc.url.origin.includes('liste')
                                ? 'Legg til i liste'
                                : 'Opprett liste'}
                        </Modal.Close>
                    </footer>
                </Modal.Panel>
            </Modal.Root>
        </>
    )
})
