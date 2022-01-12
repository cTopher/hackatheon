export async function fetcher(input: RequestInfo, init?: RequestInit): Promise<any> {
    const res = await fetch(input, init)
    return res.json()
}

export async function post(url: string, data: any): Promise<Response> {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}