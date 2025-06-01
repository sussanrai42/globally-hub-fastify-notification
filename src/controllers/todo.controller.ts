let addTodo = async (request: any, reply: any) => {
    const { title, body } = request.body;
    reply.send({ status: "200", body: { title, body }, message: 'Data inserted' });
}

let getTodos = async (request: any, reply: any) => {
    reply.send({ status: "200", body: { 
        "data": [
            { id: 1, title: "Title 1", body: "Body 1" },
            { id: 2, title: "Title 2", body: "Body 2" },
            { id: 3, title: "Title 3", body: "Body 3" }
        ]
     }, message: 'Data fetched successfully' });
}

export { addTodo, getTodos }