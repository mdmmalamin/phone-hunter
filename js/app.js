    /* ---------------------------------------
    --------------------------------------- */
const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    // console.log(phones);
    const phonesContaienr = document.getElementById('phones-container');
    phonesContaienr.textContent =``;
    /* ---------------------------------------
        display 6 phone only
    --------------------------------------- */
    const showAll = document.getElementById('show-all');
    if(phones.length > 6){
        phones = phones.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    /* ---------------------------------------
        display no phone found
    --------------------------------------- */
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    /* ---------------------------------------
        display all phones
    --------------------------------------- */
    phones.forEach(phone => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
        colDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContaienr.appendChild(colDiv);
    });
    /* ---------------------------------------
        loading stop
    --------------------------------------- */
    toggleSpinner(false);
}
    /* ---------------------------------------
        Search handler
    --------------------------------------- */
document.getElementById('btn-search').addEventListener('click', function(){
    /* ---------------------------------------
        loading start
    --------------------------------------- */
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
});

const toggleSpinner = isLoading =>{
    const loadingSection = document.getElementById('loading');
    if(isLoading){
        loadingSection.classList.remove('d-none');
    }
    else{
        loadingSection.classList.add('d-none');
    }
}

loadPhones('phone');