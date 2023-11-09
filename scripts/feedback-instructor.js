
var token = localStorage.getItem('jwtToken');
function preencherFeedbackAtributes() {
    const registerForm = document.getElementById('register-form');
    getAllAtributes()
      .then(data => {
        if (data && data.length > 0) {
          data.forEach((atributo) => {
            const checkboxDivMain = document.createElement('div');
            checkboxDivMain.id = `checkbox`;
            const feedbackContainer = document.createElement('div');
            feedbackContainer.id = `feedback-container`;
            const tituloDiv = document.createElement('div');
            tituloDiv.id = `feedback-titulo`;
            
            tituloDiv.innerHTML = `<p>${atributo}</p>`;
  
            // Crie uma div para os checkboxes com id e label personalizados
            const checkboxLabels = ['Abaixo', 'Dentro', 'Acima'];
            checkboxLabels.forEach(label => {
              const input = document.createElement('input');
              const labelElement = document.createElement('label');
              const id = `${label}-esperado-${atributo}`;
  
              input.type = 'radio';
              input.id = id;
              input.name = `${atributo}`;
              input.value = `${label} do esperado`;
  
              labelElement.htmlFor = id;
              labelElement.textContent = `${label} do esperado`;
  
              const checkboxContent = document.createElement('div');
              checkboxContent.id =  `checkbox-content`;
              checkboxContent.appendChild(input);
              checkboxContent.appendChild(labelElement);
             checkboxDivMain.appendChild(checkboxContent);
             feedbackContainer.appendChild(tituloDiv);
            feedbackContainer.appendChild(checkboxDivMain);
            registerForm.appendChild(feedbackContainer);
            });      
          });
          const button = document.createElement('div');
            const inputButton = document.createElement('input');
            inputButton.type = 'submit';
            inputButton.value = 'Salvar';
            button.appendChild(inputButton);
            registerForm.appendChild(button);
        } else {
          console.error('A lista de atributos está vazia ou não está definida.');
        }
      })
      .catch(error => {
        console.error('Erro ao obter os atributos:', error);
      });
      
}
function fetchPostEmail(formData) {
  
    fetch(`${baseUrl}/email/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formData),
    })
    .then((data) => {
        console.log("Resposta do servidor:", data);
    })
    .catch((error) => {
        console.error("Erro ao enviar a imagem:", error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    verificaCredenciaisAdm()
    populateChallengeSelect()
    populateProjectSelect();
    preencherFeedbackAtributes();
    const projectSelect = document.getElementById('project');
    const nameSelect = document.getElementById('name');
    const challengeSelect = document.getElementById('desafio')
    projectSelect.addEventListener('change', function () {
        const selectedProject = projectSelect.value;
        nameSelect.innerHTML = '<option selected disabled>Escolha um aluno</option>';
        if (selectedProject) {
            getStudentsName(selectedProject)
                .then(studentNames => {
                    studentNames.forEach(studentName => {
                        const option = document.createElement('option');
                        option.value = studentName;
                        option.text = studentName;
                        nameSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar os nomes dos alunos:', error);
                });
        }
    });
    const feedbackForm = document.getElementById('register-form');
    const form = document.querySelector('form');
   
    
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var formDataEmail = sendFormDataEmail();
        const selectedProject = projectSelect.value;
        const selectedName = nameSelect.value;
        const selectedDesafio = challengeSelect.value;
        
        
        var dataForm = new FormData(form);
        dataForm.delete('project');
        dataForm.delete('name');
        dataForm.delete('desafio')
        var feedbackList = [];
        var formData = dataForm.entries(dataForm);
        
        for (const [key, value] of formData) {
            var feedbackDTO = {
                type: "INSTRUCTOR_EVALUATION",
                atributes: key,
                status: value

            };
            feedbackList.push(feedbackDTO);
        }
  
        fetchPost(feedbackList,selectedName,selectedDesafio)
        fetchPostEmail(formDataEmail)
       
    });
    
});
function fetchPost(formData,selectedName,selectedDesafio){
    fetch(`${baseUrl}/feedback/${selectedDesafio}/${selectedName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token // Defina o cabeçalho Content-Type para JSON
      },
      body: JSON.stringify(formData), 
      })
        .then((data) => {
          console.log("Resposta do servidor:", data);
          alert("Feedback Cadastrado com sucesso!")
        })
        .catch((error) => {
          console.error("Erro ao enviar a imagem:", error);
        });
  }