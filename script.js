let userList = []

document.addEventListener("DOMContentLoaded", function () {
  fetchUserData(); // Fetch data when the document is loaded

});

async function fetchUserData(filter) {


  const response = await fetch(`http://localhost:3000/api/getUsers`)

  let data = await response.json()

  const select = document.getElementById('username');

  data.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option[0];
    optionElement.textContent = option[1];
    select.appendChild(optionElement);
  });
}

async function fetchPeople(filter) {


  const response = await fetch(`http://localhost:3000/api/data?name=${filter}`)

  let data = await response.json()

  return data;
}



function filterDropdown() {

  let input, filter, dropdown, items, txtValue;
  input = document.querySelector('.search-box');
  filter = input.value.toUpperCase();
  dropdown = document.getElementById("dropdown-content");
  dropdown.innerHTML = ''; // Clear previous results
  dropdown.style.maxWidth = '770px'
  count = 0;

  fetchPeople(filter).then(people => {

    people.forEach(person => {
      if (count < 5) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = person.item.name;
        link.onclick = function () {
          showPersonInfo(person);
          dropdown.style.display = "none";

        };
        dropdown.appendChild(link);
        count++;
      }

    });
  });

  dropdown.style.display = "block";
}

async function showPersonInfo(person) {
  const infoBox = document.getElementById("person-info");
  infoBox.innerHTML = `
      <h3>${person.item.name}</h3>
      <p>Phone: ${person.item.phones[0]}</p>
      <p>Email: ${person.item.primary_email}</p>
      <button id="sendRequestBtn">Follow</button>
    `;
  infoBox.style.display = "block";
  document.getElementById("sendRequestBtn").addEventListener("click", async function () {
    var user_ele = document.getElementById("username");

    const res = await fetch(`http://localhost:3000/api/data/subscribe?userID=${user_ele.value}&personID=${person.item.id}`,{
      method: 'POST'
    })
    const data=  await res.json()
    
    const message = document.createElement('p');
    message.textContent = data.message;
    const person_url = document.createElement('a')
    person_url.href = `https://red-wireless.pipedrive.com/person/${person.item.id}`
    person_url.text = `https://red-wireless.pipedrive.com/person/${person.item.id}`
    infoBox.appendChild(message)
    infoBox.appendChild(person_url)

  });
}
