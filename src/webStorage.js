import { todoFactory } from "./TodoFactory.js";
import { projectFactory } from "./ProjectFactory.js";

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        (// everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  function getStorage() {
    let storageTitles = window.localStorage.getItem('projectTitles');
    let projectTitles = JSON.parse(storageTitles);

    let storageProjects = projectTitles.map(function(projectTitle) {
      const project = window.localStorage.getItem(projectTitle);
      return JSON.parse(project);
    });

    let projectsArray = storageProjects.map(_instantiateProject);
    return projectsArray;
  }

  const _instantiateProject = function(storageProject) {
    let storageTodos = storageProject.todoArray;

    let todoArray = storageTodos.map(function(todo) {
      const date = new Date(todo.dueDate)
      const newTodo = todoFactory(todo.title, todo.desc, date, todo.priority, todo.notes);
      return newTodo;
    });

    return projectFactory(storageProject.title, todoArray);
  }

  export { storageAvailable, getStorage };