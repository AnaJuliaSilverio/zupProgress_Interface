const mentorURL = "http://localhost:8080/mentor";

function cadastrarMentor(formData) {
  fetch(mentorURL, {
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
    const bio = document.querySelector("#bio").value;
    const email = document.querySelector("#email").value;
    const startMentoring = document.querySelector("#startMentoring").value;
    const endMentoring = document.querySelector("#endMentoring").value;
  
    // Seleção do valor do treinamento com base nos botões de rádio
    const isTraining = document.querySelector('input[name="training"]:checked').value === 'Sim';
  
  
    if (!startMentoring || !endMentoring) {
        // Se uma das datas estiver vazia, exiba uma mensagem de erro ou impeça o envio do formulário.
        alert("Por favor, preencha as datas de início e término da mentoria.");
      } else {
        // Se ambas as datas estiverem preenchidas, continue com o envio do formulário.
        const formData = {
          name: name,
          bio: bio,
          email: email,
          training: isTraining,
          startMentoring: startMentoring,
          endMentoring: endMentoring
        };
        cadastrarMentor(formData);
      }
    
  });