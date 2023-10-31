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
document.addEventListener('DOMContentLoaded',verificaCredenciaisUser);
document.addEventListener('DOMContentLoaded', updateStudentInfo);
