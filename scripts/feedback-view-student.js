var selectedValueAvaliacao
var selectedValueDesafio
var token = localStorage.getItem('jwtToken');
var email = localStorage.getItem('email')
function getAllChallengeName() {
    return fetch('http://localhost:8080/challenge', {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
}

function getAllFeedback(selectedValueDesafio,selectedValueAvaliacao) {
    return fetch(`http://localhost:8080/feedback/${selectedValueDesafio}/${selectedValueAvaliacao}/${email}`, {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
  }
function populateProjectSelect() {
    const selectElement = document.getElementById('desafio');
    
    getAllChallengeName()
        .then(challengeNames => {
            challengeNames.forEach(challengeName => {
                const option = document.createElement('option');
                option.value = challengeName;
                option.text = challengeName;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os nomes dos desafios:', error);
        });
}


function createIcon(fill) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", fill);
    svg.className = "bi bi-square-fill";
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.style.marginRight = "8px"; 
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z");
    
    svg.appendChild(path);
    return svg;
}

const selectElementAvalicao = document.getElementById('avaliacao'); // Obtenha o elemento select por ID

selectElementAvalicao.addEventListener('change', function() {
    const selectedOption = selectElementAvalicao.options[selectElementAvalicao.selectedIndex]; // Obtenha a opção selecionada
    conteudoContainer.innerHTML = '';
    if (selectedOption) {
        if(selectedOption.value==="auto-avaliacao"){
            selectedValueAvaliacao="SELF_EVALUATE"
           
        }else if(selectedOption.value==="avaliacao-instrutor"){
            selectedValueAvaliacao="INSTRUCTOR_EVALUATION"
        }else if(selectedOption.value==="avaliacao-mentor"){
            selectedValueAvaliacao="MENTOR_ASSESSMENT"
        } 
        getAllFeedback(selectedValueDesafio,selectedValueAvaliacao);
        preencherFeedback();
    } else {
        console.log('Nenhuma opção selecionada');
    }
});
const selectElementDesafio = document.getElementById('desafio'); // Obtenha o elemento select por ID

selectElementDesafio.addEventListener('change', function() {
    const selectedOption = selectElementDesafio.options[selectElementDesafio.selectedIndex]; // Obtenha a opção selecionada
    conteudoContainer.innerHTML = '';
    if (selectedOption) {
        selectedValueDesafio = selectedOption.value;
        console.log('Opção selecionada:', selectedValueDesafio);
    } else {
        console.log('Nenhuma opção selecionada');
    }
});

const conteudoContainer = document.getElementsByClassName("container")[0];
function preencherFeedback() {
   

    getAllFeedback(selectedValueDesafio,selectedValueAvaliacao)
      .then(data => {
        if (data && data.length > 0) {
          data.forEach((atributo, index) => {
            const divEsquerda = document.createElement("div");
            divEsquerda.id = "esquerda";

            const divConteudo = document.createElement("div");
            divConteudo.id = "conteudo";

            const h2 = document.createElement("h2");
            h2.textContent = atributo.atributes;
            const h4 = document.createElement("h4");
           
            if (atributo.status === "acima-esperado") {
                for (let i = 0; i < 3; i++) {
                    h4.appendChild(createIcon("green"));
                }
                h4.appendChild(document.createTextNode("Acima do esperado"));
            } else if (atributo.status === "dentro-esperado") {
                for (let i = 0; i < 2; i++) {
                    h4.appendChild(createIcon("green"));
                }
                h4.appendChild(createIcon("grey"))
                h4.appendChild(document.createTextNode("Dentro do esperado"));
            } else if (atributo.status === "abaixo-esperado") {
                h4.appendChild(createIcon("green"));
                h4.appendChild(createIcon("grey"))
                h4.appendChild(createIcon("grey"))
                h4.appendChild(document.createTextNode("Abaixo do esperado"));
            }
            
           

            divConteudo.appendChild(h2);
            divConteudo.appendChild(h4);
            divEsquerda.appendChild(divConteudo);
            if (atributo.description) {
                const descricao = document.createElement("h3");
                descricao.textContent = "Descrição";

                const p = document.createElement("p");
                p.textContent = atributo.description;

                divConteudo.appendChild(descricao);
                divConteudo.appendChild(p);
            }

            conteudoContainer.appendChild(divEsquerda);
          });
        } else {
          console.error('A lista de atributos está vazia ou não está definida.');
        }
      })
      .catch(error => {
        console.error('Erro ao obter os atributos:', error);
      });
  }


document.addEventListener('DOMContentLoaded', populateProjectSelect);
