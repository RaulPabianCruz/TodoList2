import "./style.css";
import { todoFactory } from './TodoFactory.js';
import { projectFactory } from './ProjectFactory.js';

const projectManager = (function (){
    const defaultProject = projectFactory('Default');
    const projectArray = [defaultProject];

    const _isValidIndex = function(index) {
        if(index >= 0 && index < projectArray.length)
            return true;
        else 
            return false;
    }
    const _isValidDeleteIndex = function(index) {
        if(index > 0 && index < projectArray.length)
            return true;
        else
            return false;
    }

    const addProject = function(title) {
        projectArray.push(projectFactory(title));
    }
    const deleteProject = function(projectIndex) {
        if(_isValidDeleteIndex(projectIndex))
            projectArray.splice(projectIndex, 1);
    }
    const editProject = function(projectIndex, title) {
        if(_isValidDeleteIndex(projectIndex))
            projectArray[projectIndex].setTitle(title);
    }
    const getProjectAt = function(projectIndex) {
        if(_isValidIndex(projectIndex))
            return projectArray[projectIndex];
        else
            return null;
    }
    const getProjectList = function() {
        return projectArray.map((project) => project);
    }

    const addTodo = function(projectIndex, todo) {
        if(_isValidIndex(projectIndex))
            projectArray[projectIndex].addTodo(todo);
    }
    const deleteTodo = function(projectIndex, todoIndex) {
        if(_isValidIndex(projectIndex))
            projectArray[projectIndex].deleteTodo(todoIndex);
    }
    const getTodoAt = function(projectIndex, todoIndex) {
        if(_isValidIndex(projectIndex))
            return projectArray[projectIndex].getTodoAt(todoIndex);
        else
            return null;
    }
    const getProjectTodoList = function(projectIndex) {
        if(_isValidIndex(projectIndex))
            return projectArray[projectIndex].getTodoList();
        else
            null;
    }

    return { addProject, deleteProject, editProject, getProjectAt, getProjectList,
            addTodo, deleteTodo, getTodoAt, getProjectTodoList };
})();

//might not be needed, not too sure yet
const logicModule = (function() {
    let selectedProjectIndex = 0;

    const _getSelectedProject = function() {
        return projectManager.getProjectAt(selectedProjectIndex);
    }

    const setSelectedProjectIndex = function(projectIndex) {
        if(projectManager.getProjectAt(projectIndex) != null)
            selectedProjectIndex = projectIndex;
    }
    const getSelectedProjectIndex = function() {
        return selectedProjectIndex;
    }   

    return { setSelectedProjectIndex, getSelectedProjectIndex};
})();

const todo1 = todoFactory('todoTitle', 'desc', '1/1/2000', 'priority', 'notes');
const todo2 = todoFactory('todoTitle2', 'desc2', '1/1/2000', 'priority2', 'notes2');
const todo3 = todoFactory('todoTitle3', 'desc3', '1/1/2000', 'priority3', 'notes3');

projectManager.addProject('project2');
projectManager.addTodo(0, todo1);
projectManager.addTodo(0, todo2);
projectManager.addTodo(1,todo3);

console.log('project List: ');
let projList = projectManager.getProjectList();
for(let i = 0; i < projList.length; i++)
    console.log(projList[i].getTitle());

console.log('todo list: default project');
let todoList = projectManager.getProjectTodoList(0);
for(let i = 0; i < todoList.length; i++){
    console.log(todoList[i].getTitle());
}

logicModule.setSelectedProjectIndex(1);

console.log('todo list: project2');
todoList = projectManager.getProjectTodoList(1);
for(let i = 0; i < todoList.length; i++){
    console.log(todoList[i].getTitle());
}

projectManager.editProject(1, 'Project3 now');
console.log('project List: ');
projList = projectManager.getProjectList();
for(let i = 0; i < projList.length; i++)
    console.log(projList[i].getTitle());