// navbar

const navContainer = document.getElementById('navbar-container');

navContainer.className = 'flex justify-between items-center py-2 md:py-11 border-b-2';

navContainer.innerHTML = `
    <div class="logo-container">
        <img src="./images/Logo.png" alt="Logo" class="md:w-full w-3/4">
    </div>

    <div class="sort-button-container">
        <button class="btn bg-gray-300 text-xs md:text-base font-medium md:px-4 md:py-2">
            Sort by popularity
        </button>
    </div>

    <div class="blog-button-container">
        <button class="btn bg-[#FF1F3D] text-xs md:text-base font-medium md:px-4 md:py-2 text-white" onclick="openBlogModal.showModal()">
            View Blog
        </button>
        <dialog id="openBlogModal" class="modal modal-bottom sm:modal-middle">
            <form method="dialog" class="modal-box bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">JavaScript Essentials</h2>
                <ul class="list-disc pl-6">
                    <li class="mb-4">
                        <span class="font-bold text-gray-700">Scope of var, let, and const:</span>
                        <ul class="list-inside pl-4">
                            <li class="text-gray-600"><strong>var:</strong> Function or global scope. Can be redeclared and reassigned. Hoisted but initialized as undefined.</li>
                            <li class="text-gray-600"><strong>let:</strong> Block scope. Can be reassigned but not redeclared. Not hoisted; accessing it before declaration throws an error.</li>
                            <li class="text-gray-600"><strong>const:</strong> Block scope. Cannot be reassigned or redeclared. Must be initialized during declaration and is not hoisted.</li>
                        </ul>
                    </li>
                    <li class="mb-4">
                        <span class="font-bold text-gray-700">Use Cases of null and undefined:</span>
                        <ul class="list-inside pl-4">
                            <li class="text-gray-600"><strong>null:</strong> Represents intentional absence of value.</li>
                            <li class="text-gray-600"><strong>undefined:</strong> Indicates a variable has been declared but not assigned a value.</li>
                            <li class="text-gray-600"><strong>Examples:</strong> Use \`== null\` to check for both null and undefined. Use \`||\` to set default values.</li>
                        </ul>
                    </li>
                    <li class="mb-4">
                        <span class="font-bold text-gray-700">Understanding REST API:</span>
                        <p class="text-gray-600 mt-2">
                            A REST API allows applications to communicate over the internet using HTTP methods like GET, POST, PUT, and DELETE.
                        </p>
                    </li>
                </ul>
                <div class="modal-action mt-6">
                    <button class="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
                </div>
            </form>
        </dialog>
    </div>
`;

// body part
const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categories = await response.json();

    const categoryButtonsContainer = document.getElementById('category-btn-container');
    categories.data.forEach(categoryItem => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `<button onclick="displayCategoryContent('${categoryItem.category_id}')" class="btn"> ${categoryItem.category} </button>`;
        categoryButtonsContainer.appendChild(buttonDiv);
    });
};

// Function to handle the display of content based on category selection
const displayCategoryContent = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const categoryContent = await response.json();

    const cardsContainer = document.getElementById('category-card-container');
    cardsContainer.innerHTML = '';

    if(categoryId === '1005'){
        cardsContainer.className = 'flex flex-col justify-center items-center gap-4 mt-11';
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<div class="flex justify-center"><img src="./images/Icon.png" class="w-86"></div><div class="flex justify-center"><p class="text-4xl font-semibold">Sorry, No content is available at this moment!</p></div>`;
        cardsContainer.appendChild(messageDiv);
        return;
    }

    cardsContainer.className = 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-11';
    categoryContent.data.forEach(contentItem => {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card';
        contentDiv.innerHTML = `
            <figure class=""><img class="w-96 h-52" src="${contentItem?.thumbnail}" alt="" /></figure>
            <div class="mt-6">
                <div class="flex items-center justify-center md:justify-between gap-6">
                    <div><img class="w-12 h-12 rounded-full" src="${contentItem?.authors[0]?.profile_picture}" alt=""></div>
                    <div class="md:flex-1"><p class="font-bold">${contentItem?.title}</p></div>
                </div>
                <div class="mt-2 flex justify-start pl-44 md:pl-16 gap-4">
                    <p>${contentItem?.authors[0]?.profile_name}</p>
                    <div>${contentItem?.authors[0]?.verified ? '<i class="fa-solid fa-check badge badge-primary text-white"></i>' : ''}</div>
                </div>
                <p class="mt-2 mb-8 pl-44 md:pl-16">${contentItem?.others?.views} views</p>
            </div>
        `;
        cardsContainer.appendChild(contentDiv);
    });
};

loadCategories();
displayCategoryContent('1000');
