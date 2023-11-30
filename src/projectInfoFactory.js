const projectInfoFactory = function(project) {
    const _getTodoArray = function() {
        return project.getTodoArray();
    }

    const getProjectTitle = function() {
        return project.getTitle();
    }
    const getTodoTitles = function() {
        const todoArray = _getTodoArray();
        return todoArray.map((todo)=>todo.getTitle());
    }
    const getTodoDueDates = function() {
        const todoArray = _getTodoArray();
        return todoArray.map((todo)=>todo.getDueDate());
    }
    const getTodoPriorities = function() {
        const todoArray = _getTodoArray();
        return todoArray.map((todo)=>todo.getPriority());
    }

    return { getProjectTitle, getTodoTitles, getTodoDueDates, getTodoPriorities };
}

export { projectInfoFactory };