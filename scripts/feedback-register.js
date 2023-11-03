const atributesURL = "http://localhost:8080/atributes";


function cadastrarAtributo(formData) {
    fetch(atributesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer '
        },
        body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Atributo cadastrado com sucesso:", data);
        const aviso = document.getElementById('aviso');
        aviso.style.display = 'block';
    
        // Esconder o aviso após 3 segundos (3000 milissegundos)
        setTimeout(() => {
          aviso.style.display = 'none';
        }, 3000);
    })
    .catch((error) => {
        console.error("Erro ao cadastrar atributo:", error);
    });
}

const form = document.querySelector("#register-form"); 

document.addEventListener('DOMContentLoaded', populateAtributesSelect);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const atributes = document.querySelector("#atributes").value;
    const formData = {
        atributes: atributes
    };

    cadastrarAtributo(formData);
});

function getAllAtributesselect() {
    return fetch('http://localhost:8080/atributes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    });
}

function populateAtributesSelect() {
    const selectElement = document.getElementById('atributesListar');
  
    getAllAtributesselect()
        .then(atributesData => {
            atributesData.forEach(atributes => {
                const option = document.createElement('option');
                option.value = atributes; 
                option.text = atributes;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar o item:', error);
        });
  }
  