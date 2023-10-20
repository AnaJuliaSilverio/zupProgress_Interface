// Função para recuperar e atualizar os valores do estudante
var image = ""
function updateStudentInfo() {
    var name = "aparecida"; // Substitua pelo nome do estudante que você deseja buscar
    fetch(`http://localhost:8080/students/${name}`) // Substitua pelo endpoint correto
        .then(response => response.json())
        .then(data => {
            fetchImage(data.image);
            document.getElementById("name").textContent = data.name;
            document.getElementById("email").textContent = data.email;
            document.getElementById("mentor").textContent = data.mentor;
            document.getElementById("city").textContent = data.city;
            document.getElementById("age").textContent = data.age;
            document.getElementById("contract_end").textContent = data.contract_end;
            document.getElementById("project").textContent = data.project;
        });
}
function fetchImage(filename) {
    const imageElement = document.getElementById("image-profile");
    const downloadUrl = `http://localhost:8080/file/download/${filename}`; 
    imageElement.src = downloadUrl;
    return fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
};
// Chame a função para carregar os dados quando a página for carregada
document.addEventListener('DOMContentLoaded', updateStudentInfo);