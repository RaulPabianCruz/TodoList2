import "./style.css";
import { todoFactory } from './TodoFactory.js';
import { projectFactory } from './ProjectFactory.js';
import { projectInfoFactory } from "./projectInfoFactory.js";
import { makeHeader } from './header.js';
import { makeSidebar } from './sidebar.js';
import { makeProjectView } from "./projectView.js";

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
    const getProjectArray = function() {
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
    const getProjectTodoArray = function(projectIndex) {
        if(_isValidIndex(projectIndex))
            return projectArray[projectIndex].getTodoArray();
        else
            null;
    }

    return { addProject, deleteProject, editProject, getProjectAt, getProjectArray,
            addTodo, deleteTodo, getTodoAt, getProjectTodoArray };
})();

//      might not be needed, not too sure yet
/*
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
*/



const container = document.querySelector('#content');
container.appendChild(makeHeader());

const projArray = projectManager.getProjectArray();
const titleArray = projArray.map((project)=>project.getTitle());
container.appendChild(makeSidebar(titleArray));

const dummyTodo = todoFactory('dummyTodo', 'this is dummy todo', '10/10/2024', 'low-priority', 'no notes');
projectManager.addTodo(0,dummyTodo);

const projInfo = projectInfoFactory(projectManager.getProjectAt(0));
container.appendChild(makeProjectView(projInfo));

