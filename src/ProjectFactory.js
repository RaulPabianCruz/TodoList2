const projectFactory = function(title, todoArray = []) {

    const _sortFunction = function(firstTodo, secondTodo) {
        const firstPriority = firstTodo.getSortPriority();
        const secondPriority = secondTodo.getSortPriority();
        return secondPriority - firstPriority;
    }
    const _isValidIndex = function(index) {
        if(index >= 0 && index < todoArray.length)
            return true;
        else
            return false;
    }

    const getTitle = () => title;
    const setTitle = newTitle => title = newTitle;
    const addTodo = function(todo) {
        todoArray.push(todo);
        todoArray.sort(_sortFunction);
    }
    const deleteTodo = function(index) {
        if(_isValidIndex(index))
            todoArray.splice(index, 1);
    }
    const getTodoAt = function(index) {
        if(_isValidIndex(index))
            return todoArray[index];
        else
            return null;
    }
    const getTodoArray = function() {
        return todoArray.map((todo) => todo);
    }
    
    const toJSON = function(){
        return { title: title, todoArray: todoArray};
    }

    return { getTitle, setTitle, addTodo, deleteTodo, getTodoAt, getTodoArray, toJSON };
}

export { projectFactory };