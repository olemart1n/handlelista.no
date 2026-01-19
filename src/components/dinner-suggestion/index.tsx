import { component$, useContext, useStore, useStyles$ } from '@builder.io/qwik'
import { Modal } from '@qwik-ui/headless'
import styles from './index.css?inline'
import {
    server$,
    useLocation,
    useNavigate,
    type Cookie,
} from '@builder.io/qwik-city'
import {
    addListToCookies,
    insertListAndIngredients,
    insertManyItems,
    insertNewList,
    selectDinnerSuggestion,
} from '~/lib'
import type { ParsedDinnerSuggestion } from '~/lib'
import { LuX } from '@qwikest/icons/lucide'
import { v4 } from 'uuid'
import { listsContext } from '~/context'

const tursoGetDinnerSuggestion = server$(async function () {
    const res = await selectDinnerSuggestion(this.env)
    if (res) {
        return res
    }
})

const tursoInsertListAndIngredients = server$(
    async function (title, ingredients) {
        const message = { error: true, list: { id: '', title: '' } }
        const newId = v4()
        const res = await insertListAndIngredients(
            this.env,
            newId,
            title,
            ingredients,
        )
        if (!res) {
            return message
        }

        const value = { id: newId, title: title }
        addListToCookies(this.cookie as Cookie, value)
        message.error = false
        message.list = value

        return message
    },
)

export const DinnerSuggestion = component$(() => {
    useStyles$(styles)
    // const loc = useLocation()
    // const nav = useNavigate()
    const context = useContext(listsContext)
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
                        <Modal.Close
                            class="cancel"
                            type="submit"
                            onClick$={() => {
                                store.name = ''
                                store.ingredients_json = []
                            }}
                        >
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
                            onClick$={(e) => {
                                tursoInsertListAndIngredients(
                                    store.name,
                                    store.ingredients_json,
                                ).then((message) => {
                                    // nav(
                                    //     loc.url.origin +
                                    //         '/liste/' +
                                    //         message.list.id,
                                    // )
                                    store.name = ''
                                    store.ingredients_json = []
                                    context.lists.push({
                                        title: message.list.title,
                                        id: message.list.id,
                                    })
                                })
                            }}
                        >
                            Opprett liste
                        </Modal.Close>
                    </footer>
                </Modal.Panel>
            </Modal.Root>
        </>
    )
})
