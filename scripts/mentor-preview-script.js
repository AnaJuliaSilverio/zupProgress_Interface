function getAllInstrutorselect() {
  return fetch('http://localhost:8080/mentor', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '
    }
})
  .then(response => response.json());
}

function populateInstructorSelect() {
  const selectElement = document.getElementById('mentor');

  getAllInstrutorselect()
      .then(leadershipData => {
          leadershipData.forEach(Instructor => {
              const option = document.createElement('option');
              option.value = mentor;
              selectElement.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar as lideranças:', error);
      });
}
document.addEventListener('DOMContentLoaded', populateInstructorSelect);