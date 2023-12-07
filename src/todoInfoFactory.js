const todoInfoFactory = function(todo, projTitle) {
    const getTodoTitle = () => todo.getTitle();
    const getTodoDesc = () => todo.getDesc();
    const getTodoDueDate = () => todo.getDueDate();
    const getTodoPriority = () => todo.getPriority();
    const getTodoNotes = () => todo.getNotes();
    const getTodoLocation = () => projTitle;

    return { getTodoTitle, getTodoDesc, getTodoDueDate, getTodoPriority,
        getTodoNotes, getTodoLocation };
}

export { todoInfoFactory };