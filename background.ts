export {}
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

console.log("background.ts")

function main() {
     fetchUserInfo().then(res => console.log(res))
}
async function fetchUserInfo() {
    const storage = new Storage()
    return await storage.get("access_token") // "value"
}
main()