
export interface Identifiable {
    id: string;
}

export function findById<T extends Identifiable>(
    items: T[],
    id: string
): T | undefined {
    return items.find((item) => item.id === id);
}
