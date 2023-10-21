const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
const uploadUrl = "http://localhost:8080/file/uploadFile";
const studentUrl = "http://localhost:8080/students";
const formDataImg = new FormData();
pictureImage.innerHTML = pictureImageTxt;
var nomeFile =""

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
    
  fetch(studentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Defina o cabeçalho Content-Type para JSON
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
    formData.append('image',nomeFile);
    const data = Object.fromEntries(formData);
    console.log(data)
    
    fetchImgPost(formDataImg)
    fetchPost(data)
  
})

function getAllProjectName() {
  return fetch('http://localhost:8080/projects', {
    headers: {
        'Accept': 'application/json'
    }
})
  .then(response => response.json());
}
function getAllMentorName() {
  return fetch('http://localhost:8080/mentor', {
    headers: {
        'Accept': 'application/json'
    }
})
  .then(response => response.json());
}

// Função para preencher o select com os projetos após a resposta da requisição.



// Chame a função para preencher o select quando a página estiver pronta.
document.addEventListener('DOMContentLoaded', populateProjectSelect);
document.addEventListener('DOMContentLoaded', populateMentorSelect);


const typeOfDisabilityInput = document.getElementById("disability");

