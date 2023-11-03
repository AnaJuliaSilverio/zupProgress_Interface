const projectUrl = "http://localhost:8080/projects";
var token = localStorage.getItem('jwtToken');
const leadershipDataMap = new Map();
const instructorDataMap = new Map();
var selectedLeadership
var selectedInstructor
function cadastrarProjeto(formData) {
  fetch(projectUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        console.error("Erro do servidor:", error.message);
        const namePlaceholder = document.getElementById('name');
        namePlaceholder.value = error.message
        namePlaceholder.style.border="3px solid red"
      });
    }
    else{
      alert("Projeto cadastrado com sucesso!")
      form.reset();
    }
  }) 
    .catch((error) => {
      console.error("Erro ao cadastrar projeto:", error);
    });
}

const form = document.querySelector("#register-form");
function verificaDataStart() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  document.querySelector("#startDate").min = currentDate;
}



form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const trainingInstitution = document.querySelector("#trainingInstitution").value;
  const startDate = document.querySelector("#startDate").value;
  const dateEnd = document.querySelector("#dateEnd").value;
  const formData = {
    name: name,
    description: description,
    trainingInstitution: trainingInstitution,
    startDate: startDate,
    dateEnd: dateEnd,
    leadership: selectedLeadership,
    instructor:selectedInstructor
  };

  cadastrarProjeto(formData);
});

function getAllLiderselect() {
  return fetch('http://localhost:8080/leadership', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token 
    }
})
  .then(response => response.json());
}

function populateLeadershipSelect() {
  const selectElement = document.getElementById('leadership');
  
  getAllLiderselect()
      .then(leadershipData => {
          leadershipData.forEach(leadership => {
              const option = document.createElement('option');
              option.value = leadership.email; 
              option.text = leadership.name;
              selectElement.appendChild(option);
              leadershipDataMap.set(leadership.email, leadership);
              
          });
      })
      .catch(error => {
          console.error('Erro ao buscar as lideranças:', error);
      });
}
document.addEventListener("DOMContentLoaded", function () {
  verificaDataStart()
  const selectElement = document.getElementById('leadership');
  const selectInstuctor = document.getElementById('Instructor');
  selectElement.addEventListener('change', function () {
    const selectedEmail = selectElement.value
    selectedLeadership = leadershipDataMap.get(selectedEmail);
   
     
  });
  selectInstuctor.addEventListener('change', function () {
    const selectedEmailIns = selectInstuctor.value
    selectedInstructor = instructorDataMap.get(selectedEmailIns);
    
     
  });
  populateLeadershipSelect()
  populateInstructorSelect()

});

function updateEmail() {
  const selectElement = document.getElementById('leadership');
  const emailInput = document.getElementById('emailLeadership');

  const selectedEmail = selectElement.value;
  emailInput.value = selectedEmail;
}
function getAllInstrutorselect() {
  return fetch('http://localhost:8080/instructor', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token 
    }
})
  .then(response => response.json());
}

function populateInstructorSelect() {
  const selectElement = document.getElementById('Instructor');

  getAllInstrutorselect()
      .then(leadershipData => {
          leadershipData.forEach(Instructor => {
              const option = document.createElement('option');
              option.value = Instructor.email; 
              option.text = Instructor.name;
              selectElement.appendChild(option);
              instructorDataMap.set(Instructor.email, Instructor);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar as lideranças:', error);
      });
}

function updateEmailInstructor() {
  const selectElement = document.getElementById('Instructor');
  const emailInput = document.getElementById('emailInstructor');

  const selectedEmail = selectElement.value;
  emailInput.value = selectedEmail;
}