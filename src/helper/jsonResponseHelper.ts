import { NextResponse } from "next/server";

interface JsonResponseInterface  {
    status: 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511,
    data?: any,
    message?: string
}

export function Ok(payload: any){
    const response : JsonResponseInterface = {
        status: 200,
        data: payload
    }
    return NextResponse.json(response)
}

export function NotFound(message: string){
    const response : JsonResponseInterface = {
        status: 404,
        message
    }
    return NextResponse.json(response, {status: 404})
}

export function InternalServerError(message: string){
    const response : JsonResponseInterface = {
        status: 500,
        message
    }
    return NextResponse.json(response, {status: 500})
}