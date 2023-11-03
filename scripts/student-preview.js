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