// Função para recuperar e atualizar os valores do estudante
var email;
var token = localStorage.getItem('jwtToken');
const urlParams = new URLSearchParams(window.location.search);
const emailUrl = urlParams.get("email");
function updateStudentInfo() {
   
    fetch(`http://localhost:8080/students/${emailUrl}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        }) // Substitua pelo endpoint correto
        .then(response => response.json())
        .then(data => {
            document.getElementById("name").textContent = data.name;
            document.getElementById("email").textContent = data.email;
            email = data.email
            document.getElementById("mentor").textContent = data.mentor;
            document.getElementById("city").textContent = data.city;
            document.getElementById("age").textContent = data.age;
            document.getElementById("contract_end").textContent = data.contract_end;
            document.getElementById("project").textContent = data.project;
            if(data.image){
                fetchImage(data.image);
            }else{
                const imageElement = document.getElementById("image-profile");
                imageElement.src ="./assets/images/aluno-sem-foto.png"
                
            }
        });
}
function fetchImage(filename) {
    const imageElement = document.getElementById("image-profile");
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
const deleteButton = document.getElementById('link-delete');
function deleteStudent() {
    const confirmed = confirm("Tem certeza de que deseja deletar este estudante?");

    if (confirmed) {
        fetch(`http://localhost:8080/students/${emailUrl}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 204) {
                alert("Estudante deletado com sucesso!");
                // Faça algo após a exclusão, se necessário
            } else {
                alert("Erro ao deletar o estudante.");
            }
            deleteButton.href = "student-preview.html"
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        // O usuário cancelou a operação
        alert("Operação cancelada.");
    }
}


const updateButton= document.getElementById('link-update')
const feedbackButton = document.getElementById('link-feedback')
updateButton.addEventListener('click',function(){
    updateButton.href = "update-student-profile.html"+"?email=" + encodeURIComponent(email);
})
feedbackButton.addEventListener('click',function(){
    feedbackButton.href = "feedback-view-student.html"+"?email=" + encodeURIComponent(email);
})
deleteButton.addEventListener
document.addEventListener('DOMContentLoaded',verificaCredenciaisAdm)

// Chame a função para carregar os dados quando a página for carregada
document.addEventListener('DOMContentLoaded', updateStudentInfo);