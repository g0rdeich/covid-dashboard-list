const info = [
    {
        countryName: 'Russia',
        'total-cases': 200000,
        'total-deaths': 1,
        flag: "https://disease.sh/assets/img/flags/ru.png",
    },
    {
        countryName: 'Belarus',
        'total-cases': 56217,
        'total-deaths': 2,
        flag: "https://disease.sh/assets/img/flags/by.png",
    },
    {
        countryName: 'USA',
        'total-cases': 300000,
        'total-deaths': 3,
        flag: "https://disease.sh/assets/img/flags/us.png",
    },
    {
        countryName: 'Canada',
        'total-cases': 123456,
        'total-deaths': 4,
        flag: "https://disease.sh/assets/img/flags/ca.png",
    },
    {
        countryName: 'Great Britain',
        'total-cases': 358751,
        'total-deaths': 5,
        flag: "https://disease.sh/assets/img/flags/gb.png",
    },
    {
        countryName: 'Sweden',
        'total-cases': 33333,
        'total-deaths': 6,
        flag: "https://disease.sh/assets/img/flags/se.png",
    },
    {
        countryName: 'Germany',
        'total-cases': 987652,
        'total-deaths': 7,
        flag: "https://disease.sh/assets/img/flags/de.png",
    },
    {
        countryName: 'Mexico',
        'total-cases': 42368,
        'total-deaths': 8,
        flag: "https://disease.sh/assets/img/flags/mx.png",
    },{
        countryName: 'Brazil',
        'total-cases': 632178,
        'total-deaths': 9,
        flag: "https://disease.sh/assets/img/flags/br.png",
    },
    {
        countryName: 'Italy',
        'total-cases': 123874,
        'total-deaths': 10,
        flag: "https://disease.sh/assets/img/flags/it.png",
    },
    {
        countryName: 'France',
        'total-cases': 243581,
        'total-deaths': 11,
        flag: "https://disease.sh/assets/img/flags/fr.png",
    },
    {
        countryName: 'Argentina',
        'total-cases': 154789,
        'total-deaths': 12,
        flag: "https://disease.sh/assets/img/flags/ar.png",
    },
]

const searchParametersArr = [
    {
        text: 'Total Cases',
        id: 'total-cases',
    },
    {
        text: 'Total Deaths',
        id: 'total-deaths',
    },
    {
        text: 'Total Recovered',
        id: 'total-recovered',
    },
    {
        text: 'Today Cases',
        id: 'today-cases',
    },
    {
        text: 'Today Deaths',
        id: 'today-deaths',
    },
    {
        text: 'Today Recovered',
        id: 'today-recovered',
    },
    {
        text: 'Total Cases per 100k',
        id: 'total-cases-100',
    },
    {
        text: 'Total Deaths per 100k',
        id: 'total-cases-100',
    },
    {
        text: 'Total Recovered per 100k',
        id: 'total-cases-100',
    },

    {
        text: 'Today Cases per 100k',
        id: 'today-cases-100',
    },
    {
        text: 'Today Deaths per 100k',
        id: 'today-deaths-100',
    },
    {
        text: 'Today Recovered per 100k',
        id: 'today-recovered-100',
    }];

function createItem(type, className, text) {
    const element = document.createElement(type);
    element.className = className;
    element.innerText = (text !== undefined) ? text: '';
    return element;
}

function createListWrapper() {
    const wrapper = createItem('div', 'list-wrapper');
    const searchParameters = createSearchParameters();
    const searchBar = createSearchBar();
    const list = createItem('div', 'list');
    const currentArr = sortArr(info, 'total-cases');
    const listItems = createListItems(currentArr, 'total-cases');
    list.append(listItems);
    wrapper.append(searchParameters, searchBar, list);
    document.body.append(wrapper);
    adjustSearchParameters('total-cases');
}

function createSearchParameters() {
    const searchParameters = createItem('div', 'search-parameters');
    for (let i = 0; i < searchParametersArr.length; i++) {
        const item = createItem('div', 'search-parameter', `${searchParametersArr[i].text}`);
        item.id = `${searchParametersArr[i].id}`;
        item.addEventListener('click', changeList);
        searchParameters.append(item);
    }
    return searchParameters;
}

function createSearchBar() {
    const searchBar = createItem('div', 'search-bar');
    searchBar.innerHTML = `<input type="text" class="search-input" onkeyup="search()" placeholder="Search..">`;
    return searchBar;
}

function createListItems(arr, param) {
    const listItems = createItem('ul', 'list-items');
    for (let i = 0; i < arr.length; i++) {
        const listItem = createListItem(arr[i].countryName, arr[i][param], arr[i].flag);
        listItems.append(listItem);
    }
    return listItems;
}

function changeList(e) {
    const listToRemove = document.querySelector('.list-items');
    if(listToRemove) {
        listToRemove.remove();
    }
    const id = e.target.id;
    const currentArr = sortArr(info, id);
    console.log(currentArr);
    adjustSearchParameters(id);
    const listItems = createListItems(currentArr, id);
    const list = document.querySelector('.list');
    list.append(listItems);
}

function adjustSearchParameters(param) {
    const searchParameters = document.querySelectorAll('.search-parameter');
    searchParameters.forEach((item) => {
        item.classList.remove('search-parameter-active');
    });
    const activeSearchParameter = document.getElementById(param);
    activeSearchParameter.classList.add('search-parameter-active');
}

function createListItem(country, number, flag) {
    const listItem = createItem('div', 'list-item');
    const cardInfo = createItem('div', 'card-info', `${number}`);
    const cardCountry = createItem('div', 'card-country-name', `${country}`);
    const cardFlag = createItem('div', 'card-flag');
    cardFlag.style.backgroundImage = `url(${flag})`;
    listItem.append(cardInfo, cardCountry, cardFlag);
    return listItem;
}

function sortArr(arr, param) {
    let res;
    res = arr.sort((a, b) => a[param] < b[param] ? 1 : -1);
    return res;
}

// https://www.w3schools.com/howto/howto_js_search_menu.asp

function search() {
    const input = document.querySelector('.search-input');
    const filter = input.value.toUpperCase();
    const li = document.querySelectorAll('.list-item');
    const names = document.querySelectorAll('.card-country-name');

    for (let i = 0; i < names.length; i++) {
        const cardText = names[i].innerText.toUpperCase();
        if (cardText.indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

window.onload = function() {
    createListWrapper();
}
