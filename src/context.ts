import { createContextId } from '@builder.io/qwik'
import { List } from './lib'

interface ListsContext {
    lists: List[]
}

export const listsContext = createContextId<ListsContext>('listsContext')
