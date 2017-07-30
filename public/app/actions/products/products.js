export const getProducts = async () => {
    try {
        const response = await fetch("/api/products", { method: "GET"})
        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const productCreate = async (payload) => {
    try {
        const response = await fetch("/api/products", { method: "POST"})
        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const productEdit = async (payload, id) => {
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        return await response.json()
    } catch (e) {
        throw(e)
    }
}
