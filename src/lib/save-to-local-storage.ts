import { v4 as uuidv4 } from 'uuid';

export type ServiceProps = {
    serviceName : string,
    created_at : Date,
    [ key : string ] : any
}

export function saveToLocalStorage(new_data : ServiceProps) {
    // 1. Ambil data string dari Local Storage
    const data : string = localStorage.getItem("data");
    const json_data : any[] = JSON.parse(data || "[]");

    // 2. Gabungkan dalam array
    const id = uuidv4();
    const new_data_with_id = { ...new_data, id: id }
    const service : any[] = [ ...json_data, new_data_with_id ]

    // 3. Simpan ke Local Storage 
    localStorage.setItem("data", JSON.stringify(service));
}