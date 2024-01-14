import axios from 'axios'

const baseUrl = 'https://lucid-backend.fly.dev/api/dream'

const getAll = async () => {
    const dreams = await axios.get(baseUrl)
    return dreams.data
}

const post = async (newDreamObj) => {
    const dream =  await axios.post(baseUrl,newDreamObj)
    return dream.data
}

module.exports = {
    getAll,
    post
}
