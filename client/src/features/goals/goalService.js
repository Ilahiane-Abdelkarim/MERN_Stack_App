import axios from 'axios'

const API_URL = 'https://ila-test1.herokuapp.com/api/goals/'

// create goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config)
    // if (response.data) {
    //     localStorage.setItem('goal', JSON.stringify(response.data))
    // }

    return response.data
}

// get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// delete user goals
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalId, config)

    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
    // show
}

export default goalService