var selectedValueAvaliacao
var selectedValueDesafio
const adminMenu = document.getElementById('admin-menu');
const userMenu = document.getElementById('user-menu');
var email
var token = localStorage.getItem('jwtToken');
var role = localStorage.getItem('role');
if(role=="admin"){
    const urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get("email");
    adminMenu.style.display = 'block';
        userMenu.style.display = 'none'; 
}else{
    email = localStorage.getItem('email')
    adminMenu.style.display = 'none';
        userMenu.style.display = 'block'; 
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
  function getConclusion(selectedValueDesafio) {
    return fetch(`http://localhost:8080/feedback/conclusion/${selectedValueDesafio}/${email}`, {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
    .then(response => response.json());
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

const selectElementAvalicao = document.getElementById('avaliacao');

selectElementAvalicao.addEventListener('change', function() {
    const selectedOption = selectElementAvalicao.options[selectElementAvalicao.selectedIndex];
    conteudoContainer.innerHTML = '';
    if (selectedOption) {
        if(selectedOption.value==="auto-avaliacao"){
            selectedValueAvaliacao="SELF_EVALUATE"
           
        }else if(selectedOption.value==="avaliacao-instrutor"){
            selectedValueAvaliacao="INSTRUCTOR_EVALUATION"
        }else if(selectedOption.value==="avaliacao-mentor"){
            selectedValueAvaliacao="MENTOR_ASSESSMENT"
        }
        else if(selectedOption.value==="conclusao"){
            selectedValueAvaliacao="CONCLUSION"
        }
        if(selectedOption.value==="conclusao"){
            getConclusion(selectedValueDesafio);
            preencherFeedbackConclusion();
        }else{
            getAllFeedback(selectedValueDesafio,selectedValueAvaliacao);
            preencherFeedback();
        }
        
        
    } else {
        console.log('Nenhuma opção selecionada');
    }
});
const selectElementDesafio = document.getElementById('desafio');

selectElementDesafio.addEventListener('change', function() {
    const selectedOption = selectElementDesafio.options[selectElementDesafio.selectedIndex];
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
            document.getElementById("nenhum-feedback").style.display="none"
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
            document.getElementById("nenhum-feedback").style.display="block"
         
        }
      })
      .catch(error => {
        console.error('Erro ao obter os atributos:', error);
      });
  }
  function preencherFeedbackConclusion() {
    getConclusion(selectedValueDesafio, selectElementAvalicao)
        .then(data => { 
            if (data && Object.keys(data).length > 0) {
                document.getElementById("nenhum-feedback").style.display="none"
                conteudoContainer.innerHTML = ""; // Limpar o conteúdo anterior

                for (const [atributo, status] of Object.entries(data)) {
                    const containerConclusion = document.createElement("div");
                    containerConclusion.id = "container-conclusion";

                    const atributoLabel = document.createElement("p");
                    atributoLabel.textContent = atributo;

                    const divConclusionBar = document.createElement("div");
                    divConclusionBar.id = "conclusion-bar";

                    const divProgressBar = document.createElement("div");
                    divProgressBar.id = "progress-bar";

                    const divProgress = document.createElement("div");
                    divProgress.id = "progress";
                    divProgress.style.width = getStatusWidth(status);

                    const statusP = document.createElement("p");
                    statusP.textContent = status;

                    divProgressBar.appendChild(divProgress);
                    divConclusionBar.appendChild(divProgressBar);
                    divConclusionBar.appendChild(statusP);
                    containerConclusion.appendChild(atributoLabel);
                    containerConclusion.appendChild(divConclusionBar);
                    conteudoContainer.appendChild(containerConclusion);
                }
            } else {
                document.getElementById("nenhum-feedback").style.display = "block";
            }
        });
}

function getStatusWidth(status) {
    if (status === "acima-esperado") {
        return "100%";
    } else if (status === "dentro-esperado") {
        return "66.66%";
    } else if (status === "abaixo-esperado") {
        return "33.33%";
    }
}
document.addEventListener('DOMContentLoaded', populateChallengeSelect);
document.addEventListener('DOMContentLoaded',verificaAutenticacao);
