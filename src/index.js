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

    return { addProject, deleteProject, editProject, getProjectAt, getProjectList };
})();

const logicModule = (function() {
    //will control action such as adding/editing/deleting/fetching todos;
})();