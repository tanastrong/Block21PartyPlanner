const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FTB-ET-WEB-WE/partyplanner'

const state = {
    party:[],
}

const partyList = document.querySelector('#parties');

const addPartyForm = document.querySelector('#addParty');

//GET
const retrieveAllParties = async ()=>{
    try{
        const response = await fetch(API_URL)
        const result = await response.json()
        state.party = result.data
        console.log(state)
    }catch(err){
        console.log(err)
    }
}
//POST
const createParty = async (newParty)=>{
    try{
    const response = await fetch(API_URL,{
        method:"POST"
        headers: {
            "Content-Type": "application/json",
        },
        body:newParty
    })
    const result = await response.json()
        state.party = result.data
        console.log(state)
        displayParty(result.data);
        addPartyForm.reset();
    }catch(err){
        console.log(err)

    }
}
const displayParty = (party) => {
    const partyItem = document.createElement('li');
    partyItem.textContent = `${party.name} - ${party.date}, ${party.time}, ${party.location}, ${party.description}`;
    partyList.appendChild(partyItem);
}
//DELETE
const deleteParty = async (deletedId)=>{
    try{
        response = await fetch(`${API_URL}/${deletedId}`{
            method:"DELETE"
        });
        state.parties = state parties.filter(party=> party.id !==deleteId);
        console.log(state);
    }catch(err){
        console.log(err)
    }
}

const displayPartyList = async () => {
    try {
        const response = await fetch(API_URL);
        const { data } = await response.json();

        // Clear existing party list before rendering
        partyList.innerHTML = '';

        // Render each party entry
        data.forEach(party => {
            const partyItem = createPartyItem(party);
            partyList.appendChild(partyItem);
        });
    } catch (error) {
        console.error('Error fetching party list:', error);
    }
}

const createPartyItem = (party) => {
    const partyItem = document.createElement('li');
    partyItem.innerHTML = `
        <span>${party.name} - ${party.date}, ${party.time}, ${party.location}, ${party.description}</span>
        <button class="delete-btn" data-id="${party.id}">Delete</button>
    `;
    const deleteButton = partyItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteParty(party.id));
    return partyItem;
}
retrieveAllParties()