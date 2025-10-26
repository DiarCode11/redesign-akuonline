export async function CreateDataHelper(url: string, data: any) {
  try {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // Auto parse JSON
    const result = await response.json();

    // Jika server mengembalikan status error (4xx / 5xx)
    return {
        ok: response.ok,
        status: response.status,
        data: result
    };

    } catch (error: any) {
        console.error("CreateDataHelper Error:", error);
        return {
            ok: false,
            status: 500,
            data: null
        };
    }
}
