export async function GetDataHelper(url: string) {
    try {
        const response = await fetch(url);
        const result = await response.json();

        if (response.ok) {
            return {
                ok: response.ok,
                status: 200,
                data: result
            };
        } else {
            return {
                ok: response.ok,
                status: response.status,
                data: result
            };
        }

    } catch (e) {
        return {
            ok: false,
            status: 200,
            data: e?.message
        };
    }
}