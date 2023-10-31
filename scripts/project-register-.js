const projectUrl = "http://localhost:8080/project";

function cadastrarProjeto(formData) {
  fetch(projectUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Projeto cadastrado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro ao cadastrar projeto:", error);
    });
}

const form = document.querySelector("#register-form");

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
  };

  cadastrarProjeto(formData);
});

function getAllLiderselect() {
  return fetch('http://localhost:8080/leadership', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' 
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
          });
      })
      .catch(error => {
          console.error('Erro ao buscar as lideranças:', error);
      });
}

function updateEmail() {
  const selectElement = document.getElementById('leadership');
  const emailInput = document.getElementById('emailLeadership');

  const selectedEmail = selectElement.value;
  emailInput.value = selectedEmail;
}

document.addEventListener('DOMContentLoaded', populateLeadershipSelect);
document.addEventListener('DOMContentLoaded', populateInstructorSelect);


function getAllInstrutorselect() {
  return fetch('http://localhost:8080/instructor', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' 
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