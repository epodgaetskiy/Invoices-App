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
