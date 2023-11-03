var image = ""
var token = localStorage.getItem('jwtToken');
var email = localStorage.getItem('email')


function updateStudentInfo() {
    fetch(`http://localhost:8080/students/${email}`,{
        headers: {
            'Authorization': 'Bearer ' + token
          },
    })
        .then(response => response.json())
        .then(data => {
          
            document.getElementById("name").textContent = data.name;
            document.getElementById("email").textContent = data.email;
            document.getElementById("mentor").textContent = data.mentor;
            document.getElementById("city").textContent = data.city;
            document.getElementById("age").textContent = data.age;
            const date = new Date(data.contract_end);
            document.getElementById("contract_end").textContent = date.toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              });;
            document.getElementById("project").textContent = data.project;
            if(data.image){
                fetchImage(data.image,document.getElementById("image-profile"));
            }else{
                const imageElement = document.getElementById("image-profile");
                imageElement.src ="./assets/images/aluno-sem-foto.png"
                
            }
             
        });
}
document.addEventListener('DOMContentLoaded',verificaCredenciaisUser);
document.addEventListener('DOMContentLoaded', updateStudentInfo);