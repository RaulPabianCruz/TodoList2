const makeHeader = function() {
    const header = document.createElement('header');
    header.classList.add('header');

    const title = document.createElement('h1');
    title.textContent = 'Todo or Not Todo';
    title.classList.add('header-text');

    header.appendChild(title);
    return header;
}

export { makeHeader };
