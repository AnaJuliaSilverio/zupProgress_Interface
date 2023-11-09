var token = localStorage.getItem('jwtToken');
const uploadUrl = `${baseUrl}/file/uploadFile`;
const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Escolha uma imagem";
const formDataImg = new FormData();
const img = document.getElementById("image-profile");
var nomeFile =""
function fetchImgPost(formData){
    fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + token
        },
      })
        .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          console.log("deuu")
          const imageElement = document.getElementById("image-profile");
          imageElement.src ="./assets/images/aluno-sem-foto.png"
        });
      }
      })
        .then((data) => {
          console.log("Resposta do servidor:", data);
        })
        .catch((error) => {
          console.error("Erro ao enviar a imagem:", error);
        });
}
inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    if (file) {
      nomeFile = file.name;
      formDataImg.append("file", file);
      const reader = new FileReader();
      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;
        
        const overlay = document.querySelector(".overlay"); 
        img.src = readerTarget.result;
        img.classList.add("image-profile");
        pictureImage.innerHTML = "";    
        pictureImage.appendChild(img);
        pictureImage.append(overlay);
      });
      reader.readAsDataURL(file);
    }
  });
function getFormDataImg(){
    return formDataImg
}
function getNomeFile(){
    return nomeFile
}
function fetchPost(formData,studentUrl,method){
    fetch(studentUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(formData), 
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            console.error("Erro do servidor:", error.message);
            const emailPlaceholder = document.getElementById('email');
            emailPlaceholder.value = error.message
            emailPlaceholder.style.border="3px solid red"
          });
        }
        else{
          alert("Aluno atualizado com sucesso!")

        }
      })
        .catch((error) => {
          console.error("Erro ao cadastrar:", error);
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


function getAllMentorName() {
  return fetch(`${baseUrl}/mentor`, {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
  .then(response => response.json());
}