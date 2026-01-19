import { type EnvGetter } from '@builder.io/qwik-city/middleware/request-handler'
import { turso } from './turso-client'
import type { List, ListItem } from '~/lib'
import type { Ingredient } from '~/lib'
export const insertNewList = async (
    env: EnvGetter,
    id: string,
    title: string,
): Promise<List | undefined> => {
    try {
        const client = turso(env)
        const newList = await client.execute({
            sql: 'INSERT INTO lists (id,title) VALUES (?,?) RETURNING *',
            args: [id, title],
        })
        if (newList.rows.length > 0) {
            return newList.rows[0] as unknown as List
        }
    } catch (error) {
        console.log('logged from the insertList: \n ' + error)
    }
}

export const insertNewItem = async (
    env: EnvGetter,
    list_id: string,
    name: string,
): Promise<ListItem | undefined> => {
    try {
        const client = turso(env)
        const res = await client.execute({
            sql: 'INSERT INTO items (name, list_id) VALUES (?, ?) RETURNING *',
            args: [name, list_id],
        })
        if (res.rows.length > 0) {
            return res.rows[0] as unknown as ListItem
        }
    } catch (error) {
        console.log(error)
    }
}

export const insertManyItems = async (
    env: EnvGetter,
    list_id: string,
    items: Ingredient[],
): Promise<boolean> => {
    const client = turso(env)
    const t = await client.transaction()

    try {
        items.forEach(async (item) => {
            await t.execute({
                sql: 'INSERT INTO items (name, list_id, extra_info) VALUES (?, ?, ?) RETURNING *',
                args: [item.name, list_id, item.amount + ' ' + item.unit],
            })
        })

        await t.commit()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const insertListAndIngredients = async (
    env: EnvGetter,
    listId: string,
    title: string,
    ingredients: Ingredient[],
): Promise<List | undefined> => {
    const client = turso(env)
    const t = await client.transaction()
    let list: List | undefined
    try {
        const newList = await client.execute({
            sql: 'INSERT INTO lists (id,title) VALUES (?,?) RETURNING *',
            args: [listId, title],
        })

        await Promise.all(
            ingredients.map(async (ing) => {
                await t.execute({
                    sql: 'INSERT INTO items (name, list_id, extra_info) VALUES (?, ?, ?) RETURNING *',
                    args: [ing.name, listId, ing.amount + ' ' + ing.unit],
                })
            }),
        )

        await t.commit()

        if (newList.rows.length > 0) {
            list = newList.rows[0] as unknown as List
            // return newList.rows[0] as unknown as List
        }
    } catch (error) {
        list = undefined
        await t.rollback()
        throw error
    }
    return list
}
