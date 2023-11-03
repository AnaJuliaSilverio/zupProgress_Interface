// Função para recuperar e atualizar os valores do estudante
var email;
var token = localStorage.getItem('jwtToken');
const urlParams = new URLSearchParams(window.location.search);
const emailUrl = urlParams.get("email");
const imageElement = document.getElementById("image-profile");


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
document.addEventListener('DOMContentLoaded', updateStudentInfo);