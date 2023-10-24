const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
const uploadUrl = "http://localhost:8080/file/uploadFile";
const studentUrl = "http://localhost:8080/students/6";
const formDataImg = new FormData();
var nomeFile =""

document.addEventListener('DOMContentLoaded', function () {
    // Faça uma requisição GET para obter os dados desejados, por exemplo, usando o Fetch API.
    var name = "aparecida";
    fetch(`http://localhost:8080/students/${name}`)
        .then(response => response.json()) // Supondo que a resposta é um JSON.
        .then(data => {
            fetchImage(data.image);
            nomeFile = data.image;
            // Preencha os campos de input com os valores obtidos.
            document.getElementById('name').value = data.name;
            document.getElementById('age').value = data.age;
            document.getElementById('contract_end').value = data.contract_end;
            document.getElementById('city').value = data.city;
            document.getElementById('email').value = data.email;
            document.getElementById('project').value = data.project;
            document.getElementById('mentor').value = data.mentor;
            document.getElementById('pcd').value = data.pcd;
            document.getElementById('typeOfDisability').value = data.typeOfDisability;
            document.getElementById('bio').value = data.bio;
        })
        .catch(error => console.error('Erro na requisição GET:', error));
});
function fetchImage(filename) {
    const imageElement = document.getElementById("image-profile");
    const downloadUrl = `http://localhost:8080/file/download/${filename}`; 
    imageElement.src = downloadUrl;
    return fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
};

inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    

    if (file) {
      nomeFile = file.name;
      console.log(nomeFile);
      formDataImg.append("file", file);
      const reader = new FileReader();
  
      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;
  
        const img = document.getElementById("image-profile");
        img.src = readerTarget.result;
        img.classList.add("image-profile");
  
        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
      });
  
      reader.readAsDataURL(file);
  
    }
  });

function fetchPost(formData){
    
  fetch(studentUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Defina o cabeçalho Content-Type para JSON
    },
    body: JSON.stringify(formData), 
    })

      .then((data) => {
        console.log(data)
        alert("Aluno Atualizado com sucesso!")
        console.log("Resposta do servidor:", data);
      })
      .catch((error) => {
        console.error("Erro ao enviar a imagem:", error);
      });
}

const form = document.querySelector('form');

form.addEventListener('submit',evento=>{
   
    evento.preventDefault();
    const formData = new FormData(form);
    formData.append('image',nomeFile);
    const data = Object.fromEntries(formData);
    console.log(data)
    
    fetchPost(data)
  
})

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