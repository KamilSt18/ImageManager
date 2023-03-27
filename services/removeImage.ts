import { mockImages } from "../models/mockImages"

export const removeImage = (id: string): boolean => {
    const index = Object.keys(mockImages).indexOf(id)

    if (index === -1) return false

    delete mockImages[id]

    return true
}
