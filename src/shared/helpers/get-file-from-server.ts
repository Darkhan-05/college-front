import {ENV} from "@/config/enviroments";

export default function getFileFromServer(src: string | null){
    if(!src) return '';

    if(src.startsWith('http')){
        return src
    }

    return `${ENV.BACKEND_API_URL}/uploads/${src}`
}
