function getAllProjectName() {
    return fetch('http://localhost:8080/projects', {
      headers: {
          'Accept': 'application/json'
      }
  })
    .then(response => response.json());
}
function getStudentsName(projectName){
    return fetch(`http://localhost:8080/projects/${projectName}`, {
        headers: {
            'Accept': 'application/json'
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
document.addEventListener("DOMContentLoaded", function () {
    // Populate the "Projeto" dropdown when the page loads
    populateProjectSelect();

    // Get references to the select elements
    const projectSelect = document.getElementById('project');
    const nameSelect = document.getElementById('name');
    
    

    // Add an event listener to the "Projeto" dropdown
    projectSelect.addEventListener('change', function () {
        const selectedProject = projectSelect.value;

        // Clear the "Nome do aluno" dropdown
        nameSelect.innerHTML = '<option selected disabled>Escolha um aluno</option>';

        // Fetch the students associated with the selected project
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
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evite que o formulário seja enviado normalmente

        // Coletar os dados do formulário
        const selectedProject = projectSelect.value;
        const selectedName = nameSelect.value;
        // Crie um objeto FeedbackDTO
        const feedbackDTO = {
            type: "INSTRUCTOR_EVALUATION",
            atributes: "Racicinio estruturado",
            status: "Acima do esperado",
        };
        const challengeName = "Desafio 1"
        
        fetch(`http://localhost:8080/feedback/${challengeName}/${selectedName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackDTO),
        })
        .then(response => {
            if (response.ok) {
                console.log('Feedback enviado com sucesso!');
            } else {
                console.error('Erro ao enviar feedback.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar feedback:', error);
        });
    });

});