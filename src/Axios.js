import Axios from 'axios';

const axiosPost = Axios.create({
    baseURL:'https://burgerproject-36842.firebaseio.com/orders.json'
});

const axiosRequestIngredients = Axios.create({
    baseURL:'https://burgerproject-36842.firebaseio.com/ingredients.json'
});

export {axiosPost,axiosRequestIngredients};