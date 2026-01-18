import { component$, useStore, useStyles$ } from '@builder.io/qwik'
import { Modal, Label } from '@qwik-ui/headless'
import styles from './index.css?inline'
import { server$, useLocation } from '@builder.io/qwik-city'
import { selectDinnerSuggestion } from '~/lib'
import type { ParsedDinnerSuggestion } from '~/lib'
import { LuX } from '@qwikest/icons/lucide'
const tursoGetDinnerSuggestion = server$(async function () {
    const res = await selectDinnerSuggestion(this.env)
    if (res) {
        return res
    }
})

export const DinnerSuggestion = component$(() => {
    useStyles$(styles)
    const loc = useLocation()

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
