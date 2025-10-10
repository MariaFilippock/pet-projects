const API_KEY = '5ed60a5aaf934bf49c7150247243010';
const LOCAL_STORAGE_APP_STATE_KEY = 'weatherApp';

const container = document.querySelector('.container_main');

renderApp();

const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_STATE_KEY)) || {
    cities: [],
    switch: 'C',
    error: '',
}

function renderApp() {
    container.innerHTML = `<div class="search_header">
        <span class="search_title">Прогноз погоды</span>

        <form id="search_form">
            <input class="search_input" type="text" placeholder="Введите название города"/>
            <button class="search_btn" type="submit">Поиск</button>
            <button class="switch_temp_btn" type="button" data-action="switch">℉/°C</button>
        </form>

    </div>

    <div class="err_message" id="error_block"></div>

    <div class="clear_all" data-action="clearAll">Очистить всё</div>

    <div class="mask" id="page_preloader">
        <div class="loader"></div>
    </div>

    <div class="cards_container"></div>`;

    attachHTMLElementsHandlers();
}

function getHTMLElements() {
    return {
        searchInput: document.querySelector('.search_input'),
        searchBtn: document.querySelector('.search_btn'),
        cardsContainer: document.querySelector('.cards_container'),
        switchTempBtn: document.querySelector('.switch_temp_btn'),
        clearAll: document.querySelector('.clear_all'),
        errBlock: document.getElementById('error_block'),
    };
}

function attachHTMLElementsHandlers() {
    const elements = getHTMLElements();

    elements.searchBtn.addEventListener('click', handleSearchCity);
    elements.clearAll.addEventListener('click', handleClearAll);
    elements.switchTempBtn.addEventListener('click', handleSwitchTemp);
}

function renderLoading(isLoading) {
    const preloader = document.getElementById('page_preloader');

    if (isLoading) {
        preloader.classList.remove('hidden');
    } else {
        preloader.classList.add('hidden');
    }
}

function handleSearchCity(event) {
    event.preventDefault();

    const searchInput = getHTMLElements().searchInput;

    if (!searchInput.value) {
        return;
    }

    renderLoading(true);

    //написать условие, если в названии ошибка, то выведи отрисовку ошибки на экране
    loadWeatherOfCity(searchInput.value).then(() => {
        saveToLocalStorage();
    }).catch((err) => {
        console.error(err);
    }).finally(() => {
        renderLoading(false);
        renderWeather();
    });
}

//убираем пробелы в ID
function removeSpacesInId(city) {
    return city.replaceAll(' ', '');
}

function renderShowMoreInfo(city) {
    return city.isMoreDetailsVisible ? `<div class="uv">УФ-индекс: ${city.uv}</div>
                                <div class="wind_dir">Ветер: ${city.windDir}</div>
                                <div class="text_info">Состояние: ${city.conditionWeather}</div>
                                <div class="hidden_info_btn" data-action="hiddenInfo">Скрыть</div>` : '';
}

function renderWeather() {
    //когда вводим новый город, значит, старый надо удалить
    getHTMLElements().cardsContainer.innerHTML = '';

    if (state.cities.length > 0) {
        const elements = getHTMLElements();

        state.cities.forEach((cityData) => {
            const timeWeather = new Date(cityData.timeOfWeather).toLocaleTimeString();
            const temperature = state.switch === 'C' ? `${cityData.temp} °C` : `${cityData.tempF} ℉`;

            const cityWeatherHTML = `
                <div class="weather_info" id = ${removeSpacesInId(cityData.city)}>
                <button class='clear_btn' type="button" data-action = 'clear'>x</button>
                <div class="city_name">${cityData.city}</div>
                <div class="city_temperature">${temperature}</div>
                <img alt="icon_temperature" class="icon_temperature" src = '${cityData.icon}' /> 
                <div class="additional_info">
                    <div class="additional_title" data-action="showInfo">Подробнее</div>
                    <div class="container_additional">${renderShowMoreInfo(cityData)}</div>
                </div>
                <div class="local_time">Актуально на ${timeWeather}</div>
                </div>`;

            elements.cardsContainer.insertAdjacentHTML('beforeend', cityWeatherHTML);

            const cityWeatherCard = document.getElementById(removeSpacesInId(cityData.city));
            const clearBtn = cityWeatherCard.querySelector('.clear_btn');
            const additionalInfoBtn = cityWeatherCard.querySelector('.additional_title');
            const hiddenInfoBtn = cityWeatherCard.querySelector('.hidden_info_btn');

            clearBtn.addEventListener('click', handleClearCard);
            additionalInfoBtn.addEventListener('click', (event) => handleShowAdditionalInfo(event, cityData));
            if (hiddenInfoBtn) {
                return hiddenInfoBtn.addEventListener('click', (event) => handleHiddenAdditionalInfo(event, cityData));
            }
        })

        elements.errBlock.innerText = state.error;
    } else {
        renderEmpty();
    }
}

function handleHiddenAdditionalInfo(event, city) {
    if (event.target.dataset.action !== 'hiddenInfo') return;
    city.isMoreDetailsVisible = false;

    renderWeather();
    saveToLocalStorage();
}

function handleShowAdditionalInfo(event, city) {
    if (event.target.dataset.action !== 'showInfo') return;
    city.isMoreDetailsVisible = true;

    renderWeather();
    saveToLocalStorage();
}

function handleClearAll(event) {
    if (event.target.dataset.action !== 'clearAll') return;

    state.cities = [];
    saveToLocalStorage();
    renderWeather();
}

function handleClearCard(event) {
    if (event.target.dataset.action !== 'clear') return;

    let parentNode = event.target.closest('.weather_info');
    let cityName = parentNode.id;

    state.cities = state.cities.filter((cityData) => removeSpacesInId(cityData.city) !== cityName);

    saveToLocalStorage();
    renderWeather();
}

function handleSwitchTemp() {
    state.switch === 'C' ? state.switch = 'F' : state.switch = 'C';

    renderWeather();
    saveToLocalStorage();
}

function loadWeatherOfCity(cityName) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`;
    const searchInput = getHTMLElements().searchInput;

    return fetch(url).then((response) => {
        return response.json()
    }).then((responseData) => {
        if (responseData.error) {
            state.error = 'Ошибка! Введите корректное название города.';
            return new Error(state.error);
        } else {
            updateCityState(responseData, cityName);
            state.error = '';
        }
        searchInput.value = '';
    })
}

function updateCityState(responseData, cityName) {
    let i = state.cities.findIndex((cityData) => {
        return cityData.city === cityName;
    })

    const loadedCity = {
        temp: responseData?.current?.temp_c,
        city: responseData?.location?.name,
        icon: responseData?.current?.condition.icon,
        timeOfWeather: responseData?.location?.localtime,
        tempF: responseData?.current?.temp_f,
        uv: responseData?.current?.uv,
        windDir: responseData?.current?.wind_dir,
        conditionWeather: responseData?.current?.condition?.text,
    };

    //проверка на то, был ли уже добавлен этот город, если был, то обновляем инфо, если нет - пушим
    if (i >= 0) {
        state.cities[i] = {...state.cities[i], ...loadedCity};
    } else {
        state.cities.push({...loadedCity, isMoreDetailsVisible: false});
    }
}

function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_APP_STATE_KEY, JSON.stringify(state));
}

function renderEmpty() {
    const cardsContainer = getHTMLElements().cardsContainer;

    return cardsContainer.insertAdjacentHTML('beforeend', `<div class="empty_container">Пусто. Введите город.<div/>`);
}

//старт моего приложения
function initApp() {
    if (state.cities.length > 0) {
        renderLoading(true);
        Promise.all(state.cities.map(city => loadWeatherOfCity(city.city)))
            .then(() => renderWeather())
            .catch((err) => {
                renderWeather();
                console.error(err);
            })
            .finally(() => {
                renderLoading(false);
            });
    } else {
        renderLoading(false);
        renderEmpty();
    }
}

initApp();
