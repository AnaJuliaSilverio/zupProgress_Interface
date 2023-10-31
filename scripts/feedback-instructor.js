
var token = localStorage.getItem('jwtToken');
function getAllProjectName() {
    return fetch('http://localhost:8080/projects', {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
}
function getAllChallengeName() {
  return fetch('http://localhost:8080/challenge', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
  .then(response => response.json());
}
function populateChallengeSelect() {
  const selectElement = document.getElementById('desafio');
  
  getAllChallengeName()
      .then(challengeNames => {
          challengeNames.forEach(challengeName => {
              const option = document.createElement('option');
              option.value = challengeName;
              option.text = challengeName;
              selectElement.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar os nomes dos desafios:', error);
      });
}

function getStudentsName(projectName){
    return fetch(`http://localhost:8080/projects/${projectName}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
      .then(response => response.json());
}

function populateProjectSelect() {
    const selectElement = document.getElementById('project');
    
    getAllProjectName()
        .then(projectNames => {
            projectNames.forEach(projectName => {
                const option = document.createElement('option');
                option.value = projectName;
                option.text = projectName;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os nomes dos projetos:', error);
        });
}
function getAllAtributes() {
    return fetch('http://localhost:8080/atributes', {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
  }
function preencherFeedbackAtributes() {
    const registerForm = document.getElementById('register-form');
    getAllAtributes()
      .then(data => {
       
       
        if (data && data.length > 0) {
            

          data.forEach((atributo, index) => {
            const checkboxDivMain = document.createElement('div');
            checkboxDivMain.id = `checkbox`;
            const feedbackContainer = document.createElement('div');
            feedbackContainer.id = `feedback-container`;
            const tituloDiv = document.createElement('div');
            tituloDiv.id = `feedback-titulo`;
            
            tituloDiv.innerHTML = `<p>${atributo}</p>`;
  
            // Crie uma div para os checkboxes com id e label personalizados
            const checkboxLabels = ['abaixo', 'dentro', 'acima'];
            checkboxLabels.forEach(label => {
              const input = document.createElement('input');
              const labelElement = document.createElement('label');
              const id = `${label}-esperado-${atributo}`;
  
              input.type = 'radio';
              input.id = id;
              input.name = `${atributo}`;
              input.value = `${label}-esperado`;
  
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
            console.log(key);
            console.log(value);
            feedbackList.push(feedbackDTO);
        }
        console.log(feedbackList)
        
      
        fetchPost(feedbackList,selectedName,selectedDesafio)
       
       
    });
    
});
function fetchPost(formData,selectedName,selectedDesafio){
    
    fetch(`http://localhost:8080/feedback/${selectedDesafio}/${selectedName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token // Defina o cabeçalho Content-Type para JSON
      },
      body: JSON.stringify(formData), 
      })
  
        .then((data) => {
          console.log(data)
          console.log("Resposta do servidor:", data);
          alert("Feedback Cadastrado com sucesso!")
        })
        .catch((error) => {
          console.error("Erro ao enviar a imagem:", error);
        });
  }