const container = document.getElementById("container")

function getAllStudents() {
    return fetch('http://localhost:8080/students', {
      headers: {
          'Accept': 'application/json'
      }
  })
    .then(response => response.json());
}

function getAllProjectName() {
    return fetch('http://localhost:8080/projects', {
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


  function showInfos(){
    getAllStudents()
        .then(data => {
           console.log(data)
            data.forEach((atributo ) => {
                    const students = document.createElement("div")
                    students.id = "students"

                    const linkProfile = document.createElement("a")
                    linkProfile.id = "linkProfile"

                    const studentImg = document.createElement("img")
                    studentImg.id = "studentImg"

                    const studentName = document.createElement("h3")
                    studentName.id = "studentName"

                    studentName.textContent = atributo.name

                    linkProfile.appendChild(studentImg)
                    linkProfile.appendChild(studentName)
                    students.appendChild(linkProfile)
                    container.appendChild(students)
                } )
        })

  }


  document.addEventListener('DOMContentLoaded', populateProjectSelect);
  document.addEventListener('DOMContentLoaded', showInfos)
