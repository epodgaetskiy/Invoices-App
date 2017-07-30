export const getInvoices = async () => {
    try {
        const response = await fetch("/api/invoices", {
            method: "GET"
        })

        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const invoiceCreate = async () => {
    try {
        const response = await fetch("/api/invoices", {
            method: "POST"
        })

        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const invoiceDelete = async (id) => {
    try {
        const response = await fetch(`/api/invoices/${id}`, {
            method: "DELETE",
        })

        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const invoiceEdit = async (payload, id) => {
    try {
        const response = await fetch(`/api/invoices/${id}`, {
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

export const invoiceItemCreate = async (id) => {
    try {
        const response = await fetch(`/api/invoices/${id}/items`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
        })

        return await response.json()
    } catch (e) {
        throw(e)
    }
}

export const invoiceItemEdit = async (payload, invoice_id, id) => {
    try {
        const response = await fetch(`/api/invoices/${id}/items/${id}`, {
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

export const invoiceItemDelete = async (invoice_id, id) => {
    try {
        const response = await fetch(`/api/invoices/${id}/items/${id}`, {
            method: "DELETE"
        })

        return await response.json()
    } catch (e) {
        throw(e)
    }
}
