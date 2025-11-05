export type Step = {id: string, description: string};

export const staticStep = {
    id: crypto.randomUUID(),
    description: ""
}