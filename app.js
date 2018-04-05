(function(){
	const config = {
    apiKey: "AIzaSyCi9qKsxA_u2g5RAdsQcLP4RgeZmSgdv-g",
    authDomain: "bai-letsmeet.firebaseapp.com",
    databaseURL: "https://bai-letsmeet.firebaseio.com",
    projectId: "bai-letsmeet",
    storageBucket: "bai-letsmeet.appspot.com",
    messagingSenderId: "1052129660767"
	};
	firebase.initializeApp(config);
	
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogOut = document.getElementById('btnLogout');
	
	btnLogin.addEventListener('click',e=>{
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		
		
		const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
		promise.catch(e=> console.log(e.message));
	});
	btnSignUp.addEventListener('click',e=>{
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		
		const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
		promise.catch(e=> console.log(e.message));
	});
	btnLogout.addEventListener('click',e =>{
		firebase.auth().signOut();
	});
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser){
			console.log(firebaseUser);
			btnLogout.classList.remove('hide');
		}else{
			console.log('not logged in');
			btnLogout.classList.add('hide');
		}
	});
		
}());