document.addEventListener('DOMContentLoaded', () => {
    //checkSession();
    //get_pet();
});

document.getElementById('adopt_pet').addEventListener('click', () => {
    get_pet();
});

async function get_pet() {
    try {
        const response = await fetch('http://localhost:5000/pets');
        const pets = await response.json();

        console.log(pets);
        

        if (response.ok) {
            displayPet(pets);
        } else {
            console.error('Error fetching pet data:', pets.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

function displayPet(pets) {
    const pet_grid = document.getElementById('pet_grid');
    pet_grid.innerHTML = '';

    pets.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'pet-card'

        const img = document.createElement('img');
        //img.src = pet.image;
        img.alt = pet.name;

        // Create the pet name element
        const name = document.createElement('h3');
        name.textContent = pet.name;
        //name.className = 'text-xl font-bold mb-2'; // Tailwind classes for name styling

        const location = document.createElement('p');
        location.textContent = "location : " + pet.location || 'unavailable';
        //ageElement.className = 'text-gray-700'; // Tailwind classes for text styling

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);

        pet_grid.appendChild(card);
    });
}