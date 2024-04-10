import axios from 'axios'

export const getProfile = async () => {
    try {
        const res = await axios.get('/api/user/profile')
        return res.data;
    } catch (e) {
        throw e
    }
}