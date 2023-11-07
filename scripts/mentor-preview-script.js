var token = localStorage.getItem("jwtToken");
function getMentorData(name) {
  return fetch(`http://localhost:8080/mentor/${name}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
}



function getAllMentorName() {
  return fetch('http://localhost:8080/mentor', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
  .then(response => response.json());
}

function populateMentorSelect() {
  const selectElement = document.getElementById('mentor');
  
  getAllMentorName()
      .then(mentorNames => {
        mentorNames.forEach(mentorNames => {
              const option = document.createElement('option');
              option.value = mentorNames;
              option.text = mentorNames;
              selectElement.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar os nomes dos mentores:', error);
      });
}

document.addEventListener('DOMContentLoaded', function(){
  populateMentorSelect()
  const mentorSelect = document.getElementById("mentor")
  mentorSelect.addEventListener("change", function(){
    const selectMentor = mentorSelect.value
    container.innerHTML = ""
    showInfos(selectMentor)
  })
});
const container = document.querySelector(".container");


function showInfos(name) {
  getMentorData(name).then((atributo) => {

    const infoDiv = document.createElement("div");
    infoDiv.id = "info";

    // Nome
    const nomeBoxDiv = document.createElement("div");
    nomeBoxDiv.id = "nome-box";

    const nomeTitulo = document.createElement("p");
    nomeTitulo.id = "titulo";
    nomeTitulo.textContent = "Nome";

    const nomeValor = document.createElement("p");
    nomeValor.id = "name";
    nomeValor.classList.add("valor");
    nomeValor.textContent = atributo.name;

    nomeBoxDiv.appendChild(nomeTitulo);
    nomeBoxDiv.appendChild(nomeValor);
    infoDiv.appendChild(nomeBoxDiv);

    // Email
    const emailBoxDiv = document.createElement("div");
    emailBoxDiv.id = "email-box";

    const emailTitulo = document.createElement("p");
    emailTitulo.id = "titulo";
    emailTitulo.textContent = "Email";

    const emailValor = document.createElement("p");
    emailValor.id = "email";
    emailValor.classList.add("valor");
    emailValor.textContent = atributo.email;

    emailBoxDiv.appendChild(emailTitulo);
    emailBoxDiv.appendChild(emailValor);
    infoDiv.appendChild(emailBoxDiv);

    // Recebeu treinamento
    const mentorBoxDiv = document.createElement("div");
    mentorBoxDiv.id = "mentor-box";

    const mentorTitulo = document.createElement("p");
    mentorTitulo.id = "training";
    mentorTitulo.textContent = "Recebeu treinamento ?";

    const mentorValor = document.createElement("p");
    mentorValor.id = "training";
    mentorValor.classList.add("valor");
    mentorValor.textContent = atributo.training ? "Sim" : "Não";

    // Início da Mentoria
    const infoUltimo = document.createElement("div");
    infoUltimo.id = "info-ultimo";
    const inicioMentoriaDiv = document.createElement("div");
    inicioMentoriaDiv.id = "inicioMentoria";

    const inicioMentoriaTitulo = document.createElement("p");
    inicioMentoriaTitulo.id = "titulo";
    inicioMentoriaTitulo.textContent = "Início da mentoria";

    const inicioMentoriaValor = document.createElement("p");
    inicioMentoriaValor.id = "startMentoring";
    inicioMentoriaValor.classList.add("valor");
    // Defina a data de início da mentoria aqui
    inicioMentoriaValor.textContent = atributo.startMentoring; // Substitua "atributo.startDate" pelo valor apropriado

    inicioMentoriaDiv.appendChild(inicioMentoriaTitulo);
    inicioMentoriaDiv.appendChild(inicioMentoriaValor);
    infoUltimo.appendChild(inicioMentoriaDiv);

    // Término da Mentoria
    const terminoMentoriaDiv = document.createElement("div");
    terminoMentoriaDiv.id = "terminoMentoria";

    const terminoMentoriaTitulo = document.createElement("p");
    terminoMentoriaTitulo.id = "titulo";
    terminoMentoriaTitulo.textContent = "Término da mentoria";

    const terminoMentoriaValor = document.createElement("p");
    terminoMentoriaValor.id = "endMentoring";
    terminoMentoriaValor.classList.add("valor");
    // Defina a data de término da mentoria aqui
    terminoMentoriaValor.textContent = atributo.endMentoring;
    // Bio
    const infoPrimeiro = document.createElement("div");
    infoPrimeiro.id = "info-primeiro";
    const bioBoxDiv = document.createElement("div");
    bioBoxDiv.id = "bio";

    const bioTitulo = document.createElement("p");
    bioTitulo.id = "titulo";
    bioTitulo.textContent = "Bio";

    const bioValor = document.createElement("p");
    bioValor.id = "bio";
    bioValor.classList.add("valor");
    // Defina o conteúdo da bio aqui
    bioValor.textContent = atributo.bio; // Substitua "atributo.endDate" pelo valor apropriado

    terminoMentoriaDiv.appendChild(terminoMentoriaTitulo);
    terminoMentoriaDiv.appendChild(terminoMentoriaValor);
    infoUltimo.appendChild(terminoMentoriaDiv);

    mentorBoxDiv.appendChild(mentorTitulo);
    mentorBoxDiv.appendChild(mentorValor);
    infoDiv.appendChild(mentorBoxDiv);

    bioBoxDiv.appendChild(bioTitulo);
    bioBoxDiv.appendChild(bioValor);
    infoPrimeiro.appendChild(bioBoxDiv);
    container.appendChild(infoDiv);
    container.appendChild(infoUltimo);
    container.appendChild(infoPrimeiro);
  });
}
