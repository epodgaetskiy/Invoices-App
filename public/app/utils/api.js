export default class Api {
    static async get(url) {
        try {
            const data = await fetch(`/api/${url}`, { method: "GET"})
            if (data.status >= 400) {
                const error = await data.json()
                throw error
            }
            return await data.json()
        } catch (e) {
            throw e
        }
    }

    static async getItem(url, id) {
        try {
            const data = await fetch(`/api/${url}/${id}`, { method: "GET"})
            if (data.status >= 400) {
                const error = await data.json()
                throw error
            }
            return await data.json()
        } catch (e) {
            throw e
        }
    }

    static async post(url) {
        try {
            const data = await fetch(`/api/${url}`, { method: "POST"})
            if (data.status >= 400) {
                const error = await data.json()
                throw error
            }
            return await data.json()
        } catch (e) {
            throw e
        }
    }

    static async put(url, payload, id) {
        try {
            const data = await fetch(`/api/${url}/${id}`, {
                method: "PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if (data.status >= 400) {
                const error = await data.json()
                throw error
            }
            return await data.json()
        } catch (e) {
            throw e
        }
    }

    static async delete(url, id) {
        try {
            const data = await fetch(`/api/${url}/${id}`, { method: "DELETE"})
            if (data.status >= 400) {
                const error = await data.json()
                throw error
            }
            return await data.json()
        } catch (e) {
            throw e
        }
    }
}
