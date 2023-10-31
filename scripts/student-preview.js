var container = document.getElementById("container")
var token = localStorage.getItem('jwtToken');

function getAllStudents(projectName) {
    return fetch(`http://localhost:8080/projects/get-students/${projectName}`, {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
}

function getAllProjectName() {
    return fetch('http://localhost:8080/projects', {
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

function showInfos(projectName) {
    getAllStudents(projectName)
        .then(data => {
            console.log(data);
            data.forEach((atributo, index) => {
                const students = document.createElement("div");
                students.id = "students";

                const linkProfile = document.createElement("a");
                linkProfile.id = "linkProfile" + index;
                linkProfile.href = "student-profile-instructor.html" + "?email=" + encodeURIComponent(atributo.email);
                const studentImg = document.createElement("img");
                studentImg.id = "studentImg" + index;
                
                const studentName = document.createElement("h3");
                studentName.id = "studentName" + index;

                studentName.textContent = atributo.name;
                if(atributo.image){
                    fetchImage(atributo.image, studentImg);
                }else{
                    studentImg.src ="./assets/images/aluno-sem-foto.png"
                }
                
                linkProfile.appendChild(studentImg);
                linkProfile.appendChild(studentName);
                students.appendChild(linkProfile);
                container.appendChild(students);
            });
        });
}



function fetchImage(filename, imageElement) {
    
    const downloadUrl = `http://localhost:8080/file/download/${filename}`;

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

document.addEventListener("DOMContentLoaded", function () {
    
    const projectSelect = document.getElementById('project');
    projectSelect.addEventListener('change', function () {
        container.innerHTML = "";
        const selectedProject = projectSelect.value;
        if (selectedProject) {
            showInfos(selectedProject);
        }
    });

    populateProjectSelect();
});

function clearPage() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
document.addEventListener('DOMContentLoaded',verificaCredenciaisAdm)