var token;
var role;
var email;
const studentUrl = "http://localhost:8080/auth/login";
const errologin= document.getElementById("erro-login")
function fetchPost(formData) {
    fetch(studentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Defina o cabeçalho Content-Type para JSON
        },
        body: JSON.stringify(formData), 
        })
        .then((response) => {
            if (response.status === 200) {
              return response.json(); // Faz o parse do JSON no corpo da resposta
            }
            else if(response.status===403){
                errologin.textContent = "Usuário incorreto"
            }
          })
          .then((data) => {
            console.log('Resposta JSON:', data); // Adicione esta linha para depurar a resposta
            if (data.token) {
                errologin.textContent = ""
              token = data.token;
              role = data.role;
              email = data.email;
              localStorage.setItem('jwtToken', token);
              localStorage.setItem('role',role);
              localStorage.setItem('email',email)
              console.log('Token JWT:', token);
              rediricionaLogin();
            } else {
              console.error('Token não encontrado na resposta.');
            }
          })
          .catch((error) => {
            console.error("Erro ao enviar a imagem:", error);
          });
}
const form = document.querySelector("form");
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
  fetchPost(data);
  form.reset();  
});
