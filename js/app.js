/* ---------------------------------------
--------------------------------------- */
const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContaienr = document.getElementById('phones-container');
    phonesContaienr.textContent =``;
/* ---------------------------------------
    display 6 phone only
--------------------------------------- */
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 6){
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
                <a onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Phone Details</a>
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

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
/* ---------------------------------------
    Search handler
--------------------------------------- */
document.getElementById('btn-search').addEventListener('click', function(){
/* ---------------------------------------
    loading start
--------------------------------------- */
    processSearch(10);
});

/* ---------------------------------------
    search input field enter key handler
--------------------------------------- */
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter') {
        processSearch(10);
    }
});


// loading function
const toggleSpinner = isLoading =>{
    const loadingSection = document.getElementById('loading');
    if(isLoading){
        loadingSection.classList.remove('d-none');
    }
    else{
        loadingSection.classList.add('d-none');
    }
}

/* ---------------------------------------
    not the best way to load show all
--------------------------------------- */
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
});
/* ---------------------------------------
    Load Phone Details 
--------------------------------------- */
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

/* ---------------------------------------
    
--------------------------------------- */
const displayPhoneDetails = phone => {
    // const phoneSensors = phone.mainFeatures.sensors;
    // for(const sensor of phoneSensors){
    //     console.log(phoneSensors);
    // }

    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not Found!'}</p>
        <p>Storage: ${phone.mainFeatures.memory ? phone.mainFeatures.storage : 'Not Found!'}</p>

        <p>Bluetooth: ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Not Found!'}</p>

        <p>Display size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'Not Found!'}</p>
        <p>sensors: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'Not Found!'}</p>
    `;
}

loadPhones('iphone');