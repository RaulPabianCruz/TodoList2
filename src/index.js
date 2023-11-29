import "./style.css";
import { todoFactory } from './TodoFactory.js';
import { projectFactory } from './ProjectFactory.js';
import { makeHeader } from './header.js';

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

const container = document.querySelector('#content');
container.appendChild(makeHeader());