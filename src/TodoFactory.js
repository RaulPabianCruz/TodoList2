const todoFactory = function(title, desc, dueDate, priority, notes) {
    const getTitle = () => title;
    const getDesc = () => desc;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;

    const setTitle = newTitle => title = newTitle;
    const setDesc = newDesc => desc = newDesc;
    const setDueDate = newDueDate => dueDate = newDueDate;
    const setPriority = newPriority => priority = newPriority;
    const setNotes = newNotes => notes = newNotes;

    const getSortPriority = function() {
        let sortPriority;
        switch(priority){
            case 'low-priority':
                sortPriority = 1;
                break;
            case 'normal-priority':
                sortPriority = 2;
                break;
            default:
                sortPriority = 3;
        }
        return sortPriority;
    }

    return { getTitle, getDesc, getDueDate, getPriority, getNotes, setTitle,
        setDesc, setDueDate, setPriority, setNotes, getSortPriority };
}

export { todoFactory };