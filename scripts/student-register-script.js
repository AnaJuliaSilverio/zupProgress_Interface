const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
const uploadUrl = "http://localhost:8080/file/uploadFile";
const studentUrl = "http://localhost:8080/students";
const registerUrl = "http://localhost:8080/auth/register"
const formDataImg = new FormData();
pictureImage.innerHTML = pictureImageTxt;
var nomeFile =""

var token = localStorage.getItem('jwtToken');
console.log(token)

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

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture_img");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);

  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});


function fetchImgPost(formData){
    
    fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + token
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Resposta do servidor:", data);
        })
        .catch((error) => {
          console.error("Erro ao enviar a imagem:", error);
        });
}
function fetchPost(formData){
    console.log(token)
  fetch(studentUrl, {
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
      })
      .catch((error) => {
        console.error("Erro ao enviar a imagem:", error);
      });
}
function fetchPostRegister(formData){
  console.log(token)
  fetch(registerUrl, {
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
    })
    .catch((error) => {
      console.error("Erro ao enviar a imagem:", error);
    });
}

const form = document.querySelector('form');

form.addEventListener('submit',evento=>{
   
    evento.preventDefault();
    const formData = new FormData(form);
    if(nomeFile){
      formData.append('image',nomeFile);
    }
    
    const data = Object.fromEntries(formData);
    const registerdata = {
      login: data.email,
      password: "senha123",
      role: 'USER'
    };
   
    if(formData.image){
      fetchImgPost(formDataImg)
    }
    
    fetchPost(data)
    fetchPostRegister(registerdata)

    form.reset();
    pictureImage.innerHTML = pictureImageTxt;
    alert("Aluno cadastrado com sucesso!")
    window.location.href ="student-profile-instructor.html"+"?email=" + encodeURIComponent(data.email);
    
  
})
function verificaData(){
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  document.getElementById('contract_end').min = currentDate;
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

function getAllMentorName() {
  return fetch('http://localhost:8080/mentor', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
  .then(response => response.json());
}

// Função para preencher o select com os projetos após a resposta da requisição.
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

// Chame a função para preencher o select quando a página estiver pronta.
document.addEventListener('DOMContentLoaded', populateProjectSelect);
document.addEventListener('DOMContentLoaded', populateMentorSelect);
document.addEventListener('DOMContentLoaded', verificaData);


const pcdSelect = document.getElementById("pcd");
const typeOfDisabilityInput = document.getElementById("disability");

pcdSelect.addEventListener("change", function () {
    const selectedValue = pcdSelect.value;
    
    // Verifique se "Sim" foi selecionado e ajuste a visibilidade do campo "Tipo de deficiência"
    if (selectedValue === "true") {
        typeOfDisabilityInput.style.display = "block";
    } else {
        typeOfDisabilityInput.style.display = "none";
    }
});