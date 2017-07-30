export const customerCreate = async (payload) => {
    try {
        const response = await fetch("/api/customers", { method: "POST"})
        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const customerEdit = async (payload, id) => {
    try {
        const response = await fetch(`/api/customers/${id}`, {
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

export const getCustomers = async () => {
    try {
        const response = await fetch("/api/customers", { method: "GET"})
        return await response.json()
    } catch (e) {
        throw(e)
    }
}
