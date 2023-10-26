const projectUrl = "http://localhost:8080/projects";

function cadastrarProjeto(formData) {
  fetch(projectUrl, {
    method: "POST",
    'Authorization': 'Bearer ' ,
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
  const descricao = document.querySelector("#description").value;
  const nomeInstrutor = document.querySelector("#nameInstructor").value;
  const emailInstrutor = document.querySelector("#emailInstructor").value;
  const nomeLideranca = document.querySelector("#nameLeadership").value;
  const emailLideranca = document.querySelector("#emailLeadership").value;
  const instituicao = document.querySelector("#trainingInstitution").value;
  const dataInicio = document.querySelector("#startDate").value;
  const dataFim = document.querySelector("#dateEnd").value;

 
  const formData = {
    name: name,
    description: descricao,
    nameInstructor: nomeInstrutor,
    emailInstructor: emailInstrutor,
    nameLeadership: nomeLideranca,
    emailLeadership: emailLideranca,
    trainingInstitution: instituicao,
    startDate: dataInicio,
    dateEnd: dataFim,
 
  };


  cadastrarProjeto(formData);
});