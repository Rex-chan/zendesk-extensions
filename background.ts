export {}
import { Storage } from "@plasmohq/storage"
console.log("background.ts")

async function main() {
    fetchUserInfo()
}
async function fetchUserInfo() {
    const storage = new Storage()
    const data = await storage.get("access_token") // "value"
    console.log(data);
}
main()
