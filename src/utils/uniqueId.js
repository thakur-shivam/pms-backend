import uid2 from "uid2";

const generateUniqueId = async () => {
    const id = uid2(20)
    return id
}

export { generateUniqueId }