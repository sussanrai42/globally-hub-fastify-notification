import { addTodo, getTodos } from "../controllers/todo.controller";

const routes= [
    {
        method: 'POST',
        url: '/addTodo',
        handler: addTodo
    },
    {
        method: 'GET',
        url: '/getTodos',
        handler: getTodos
    },
    // {
    //     method: 'GET',
    //     url: '/getTodo/:id',
    //     handler:controllers.getSingleTodo
    // },
    // {
    //     method: 'DELETE',
    //     url: '/deleteTodo/:id',
    //     handler:controllers.deleteTodo
    // },
    // {
    //     method: 'PUT',
    //     url: '/updateTodo/:id',
    //     handler:controllers.updateTodo
    // }
]

export default routes;