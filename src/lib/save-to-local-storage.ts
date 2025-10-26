"use client";
import { Requester } from '@/dtos/kk/KkRequesterDto';
import { v4 as uuidv4 } from 'uuid';

export type ServiceProps = {
    serviceName : string,
    requestedBy? : Requester,
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

export function getDataById(id: string) {
    // 1. Ambil data string dari Local Storage
        const data : string = localStorage.getItem("data");
        const json_data : any[] = JSON.parse(data || "[]");

        const data_by_id = json_data.filter((data) => data.id == id )
    return data_by_id;
}

// Fungsi Create
export function saveToLocalStorageTemp(new_data: any[]) {
    // 1. Ambil data string dari Local Storage
    const data : string = localStorage.getItem("temp");
    const json_data : any[] = JSON.parse(data || "[]");

    // 2. Gabungkan dalam array
    const id = uuidv4();
    const new_data_with_id = { ...new_data, id: id }
    const service : any[] = [ ...json_data, new_data_with_id ]
    localStorage.setItem("temp", JSON.stringify(service));
    console.log("berhasil menyimpan data")
}

// Get Data Temp All
export function getDataTempAll() {
    const data : string = localStorage.getItem("temp");
    const json_data : any[] = JSON.parse(data || "[]");

    return json_data;
}

// Get Data Temp By Index
export function getDataTempByIdx(idx : number) {
    const data : string = localStorage.getItem("temp");
    const json_data : any[] = JSON.parse(data || "[]");
    
    if (json_data.length > 0){
        return json_data[idx];
    }

    return [];
}

// Delete data 
export function deleteDataTempByIdx(idx: number){
    const data : string = localStorage.getItem("temp");
    const json_data : any[] = JSON.parse(data || "[]");

    const new_json = json_data.filter((_, index) => index !== idx);
    localStorage.setItem("temp", JSON.stringify(new_json));
    console.log("berhasil menyimpan data")
}

// Update data
export function updateDataTempById(idx: number, new_data: object) {
    const data : string = localStorage.getItem("temp");
    const json_data : any[] = JSON.parse(data || "[]");

    json_data[idx] = new_data
    localStorage.setItem("temp", JSON.stringify(json_data));
    console.log("berhasil mengupdate data data")
}

export function deleteDataTemp(){
    localStorage.removeItem("temp");
} 