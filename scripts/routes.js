var role = localStorage.getItem('role');
var token = localStorage.getItem('token');
function rediricionaLogin(){
    
    if (role === 'admin') {
        window.location.href = 'index-instructor.html';
    }
    if(role ==='user'){
        window.location.href = 'student-profile.html';
    }
}

function verificaCredenciaisAdm(){
    if(role ==='user'){
        window.location.href = 'error-page.html';
    }
}
function verificaCredenciaisUser(){
    if(role ==='admin'){
        window.location.href = 'error-page.html';
    }
}
function verificaAutenticacao(){
    if(!token){
        window.location.href = 'error-page.html';
    }
}
function exit(){
    const exitIcon = document.getElementById("exit");
    exitIcon.addEventListener("click",function(){
        localStorage.clear();
    })
}
document.addEventListener('DOMContentLoaded',exit);
