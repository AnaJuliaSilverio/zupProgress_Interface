var role = localStorage.getItem('role');
function rediricionaLogin(){
    
    if (role === 'admin') {
        window.location.href = 'student-register.html';
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