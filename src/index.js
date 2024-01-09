console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', ()=>{
function handleDogs(dog){
    let div=document.getElementById('dog-image-container')

    div.innerHTML=`
    <div>
    <img src=${dog} alt=${dog.name}/>
    </div>
    `
}

function getDogs(){//get random dogs
        fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(res=>res.json())
        .then(data=>data.message.forEach(dog=>handleDogs(dog)))
        .catch(error=>console.log(error,'error fetching dogs'))
    }
    getDogs()
//get dogs by the breed
function handleBreeds(breed){
    let ul=document.getElementById('dog-breeds')
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;  //get the image of the breed
        

            ul.innerHTML += `
                <li>
                    <p>${breed}</p>
                    <img src="${imageUrl}" alt="${breed} width="400px" height="400px" Image"/>
                </li>
            `;
        })
        .catch(error => console.error('Error fetching breed image:', error));
}

    function getBreeds(){
        fetch('https://dog.ceo/api/breeds/list/all')//fetch the breed
        .then(res=>res.json())
        .then(data=>{
            const breeds=Object.keys(data.message) //use Object.keys to get the keys of the breeds array.
        breeds.forEach(breed=>handleBreeds(breed))
    })
        .catch(error=>console.log(error, 'error fetching breeds'))
    }
    getBreeds()


   //filter function to get specific breed
function handleFilter() {
    
    let ul = document.getElementById('dog-breeds');
    let select = document.getElementById('breed-dropdown');

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(data => {
            let breeds = Object.keys(data.message); //use of Object.keys() to get the keys of the breeds array
            //filter
            let filteredBreeds = breeds.filter(breed => breed.startsWith(select.value)); //if the name of the breeds start with the value in the select
//startsWith determines whether a string begins with the characters of a specified string
            ul.innerHTML = ''; // Clear existing content

            filteredBreeds.forEach(breed => {
                fetch(`https://dog.ceo/api/breed/${breed}/images/random`) //fetch the filtered breeds
                    .then(response => response.json())
                    .then(data => {
                        const imageUrl = data.message;
                        ul.innerHTML += `
                            <li>
                                <p>${breed}</p>
                                <img src="${imageUrl}" alt="${breed} Image" width="400px" height="400px"/>
                            </li>
                        `;
                    })
                    .catch(error => console.error('Error fetching filtered breed image:', error));
            });
        })
        .catch(error => console.log(error, 'error fetching breeds'));
}
let select = document.getElementById('breed-dropdown'); 
//add eventlistener to select element to perform the filter method
    select.addEventListener('change', handleFilter); //select uses the "change" event listener

handleFilter();



    
})





