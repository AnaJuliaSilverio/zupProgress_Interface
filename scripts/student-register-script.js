const studentUrl = `${baseUrl}/students`;
const registerUrl = `${baseUrl}/auth/register`

img.src ="./assets/images/aluno-sem-foto.png"
var senha
var formDataEmail
var token = localStorage.getItem('jwtToken');
const pcdSelect = document.getElementById("pcd");
const typeOfDisabilityInput = document.getElementById("disability");
const form = document.querySelector('form');
function fetchPostEmail(formData) {
  fetch(`${baseUrl}/email/send`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(formData),
  })
  .then((data) => {
      console.log("Resposta do servidor:", data);
  })
  .catch((error) => {
      console.error("Erro ao enviar a imagem:", error);
  });
}
function fetchPostRegister(email){
  const formData = {
    login: email,
    password: senha,
    role: 'USER'
  };
  console.log(token)
  fetch(registerUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + token
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
form.addEventListener('submit',evento=>{
  evento.preventDefault();
  senha = gerarSenha()
  formDataEmail = sendEmailPassword(senha)
   
    const formData = new FormData(form);
   
      formData.append('image',getNomeFile());
   
    const data = Object.fromEntries(formData);
    
      fetchImgPost(getFormDataImg())
    
    fetchPost(data,studentUrl,"POST")
    fetchPostRegister(data.email)
    fetchPostEmail(formDataEmail)
    pictureImage.innerHTML = pictureImageTxt;
 
})
function verificaData(){
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  document.getElementById('contract_end').min = currentDate;
}
document.addEventListener('DOMContentLoaded', populateProjectSelect);
document.addEventListener('DOMContentLoaded', populateMentorSelect);
document.addEventListener('DOMContentLoaded', verificaData);

pcdSelect.addEventListener("change", function () {
    const selectedValue = pcdSelect.value;
    if (selectedValue === "true") {
        typeOfDisabilityInput.style.display = "block";
    } else {
        typeOfDisabilityInput.style.display = "none";
    }
});