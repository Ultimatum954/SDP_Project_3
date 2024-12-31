document.getElementById("loginform").addEventListener("submit", async (event) => {
   const email =  document.getElementById('email').value;
   const pass =  document.getElementById('password').value;
   console.log(pass);

   const loginData = { email, pass };

   try {
       const response = await fetch("http://localhost:5000/login", {
           method: "POST",
           credentials: "include",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify(loginData),
       });

       const result = await response.json();
       console.log(result);
       
       if (response.ok) {
           alert("Login successful!");
       } else {
           alert(`Error: ${result.message}`);
       }
   } catch (error) {
       console.error("Error during login:", error);
       alert("An error occurred. Please try again later.");
   }
   
});

