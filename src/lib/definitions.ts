export interface List {
    id: string
    created_at?: string
    title: string
}

export interface ListItem {
    id: number
    created_at: string
    name: string
    purchased: boolean
    extra_info: string
    list_id: number
}

export interface Prompt1 {
    dinner: string
    ingredients: string[]
}

export interface DinnerSuggestion {
    id: number
    name: string
    ingredients_json: string // Change this to string to match the database type
    base_portions: number
    preparation: string
}

// After parsing the JSON string, you can use this type to represent the parsed data
export type ParsedDinnerSuggestion = Omit<
    DinnerSuggestion,
    'ingredients_json'
> & {
    ingredients_json: Ingredients[]
}

export interface Ingredients {
    name: string
    amount: number
    unit: string
}
