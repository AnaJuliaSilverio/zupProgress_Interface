var token = localStorage.getItem('jwtToken');
function getAllProjectName() {
    return fetch(`${baseUrl}/projects`, {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
}
function getAllChallengeName() {
  return fetch(`${baseUrl}/challenge`, {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
  .then(response => response.json());
}
function getStudentsName(projectName){
    return fetch(`${baseUrl}/projects/${projectName}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
      .then(response => response.json());
}

function getAllAtributes() {
    return fetch(`${baseUrl}/atributes`, {
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

function fetchImage(filename, imageElement) {
    
    const downloadUrl = `${baseUrl}/file/download/${filename}`;

    return fetch(downloadUrl, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
    .then((response) => {
        return response.blob();
    })
    .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        imageElement.src = imageUrl;
    })
    .catch((error) => {
        console.error(error);
    });
}

function updateStudentInfo() {
   
    fetch(`${baseUrl}/students/${emailUrl}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("name").textContent = data.name;
            document.getElementById("email").textContent = data.email;
            email = data.email
            if(data.pcd==="false"){
                document.getElementById("pcd-info").style.display='none'
            }else{
                document.getElementById("typeOfDisability").textContent = data.typeOfDisability;
                document.getElementById("pcd").textContent = data.pcd
            }
            document.getElementById("mentor").textContent = data.mentor;
            document.getElementById("city").textContent = data.city;
            document.getElementById("age").textContent = data.age;
            const date = new Date(data.contract_end);
            document.getElementById("contract_end").textContent = date.toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              });;
            document.getElementById("project").textContent = data.project;
            document.getElementById("bio").textContent =data.bio
            if(data.image){
                fetchImage(data.image,imageElement);
            }else{
                imageElement = document.getElementById("image-profile");
                imageElement.src ="./assets/images/aluno-sem-foto.png"
                
            }
        });
}


