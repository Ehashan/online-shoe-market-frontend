import { createClient } from "@supabase/supabase-js";

const supabse = createClient(
    "https://vgdtsbzosyukqvlhysfy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZHRzYnpvc3l1a3F2bGh5c2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzgyOTAsImV4cCI6MjA4NzAxNDI5MH0.j0cQhSdDTCrMVjn8odCnId3kjJIfLO_z_DpUDhqhvFM"
)


export default function MediaUpload(file){
    const promise = new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+""+file.name

            supabse.storage.from("shoe_images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    const url = supabse.storage.from("shoe_images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)

            }
            ).catch(
                (error)=>{
                    reject(error)
                }
            )
        }
    )
    return promise

}