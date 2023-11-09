
var token = localStorage.getItem('jwtToken');
const urlParams = new URLSearchParams(window.location.search);
const emailUrl = urlParams.get("email");
const studentUrl = `${baseUrl}/students/${emailUrl}`;
const imageElement = document.getElementById("image-profile");
const form = document.querySelector('form');
document.addEventListener('DOMContentLoaded', function () {
  verificaCredenciaisAdm()
    fetch(`${baseUrl}/students/${emailUrl}`, {
      headers: {
          'Authorization': 'Bearer ' + token
      }
      })
        .then(response => response.json())
        .then(data => {
            fetchImage(data.image,imageElement);
            populateProjectSelect();
            populateMentorSelect();
            nomeFile = data.image;
            document.getElementById('name').value = data.name;
            document.getElementById('age').value = data.age;
            document.getElementById('contract_end').value = data.contract_end;
            document.getElementById('city').value = data.city;
            document.getElementById('email').value = data.email;
            document.getElementById('pcd').value = data.pcd;
            document.getElementById('typeOfDisability').value = data.typeOfDisability;
            document.getElementById('bio').value = data.bio;
            document.getElementById("selected-mentor").textContent = data.mentor;
            document.getElementById("selected-project").textContent = data.project;
        })
        .catch(error => console.error('Erro na requisição GET:', error));
});

form.addEventListener('submit',evento=>{
    evento.preventDefault();
    const formData = new FormData(form);
    
      formData.append('image',getNomeFile());
    
    const data = Object.fromEntries(formData);
    
      fetchImgPost(getFormDataImg())
      console.log("oi")
    
    fetchPost(data,studentUrl,"PUT")
})
