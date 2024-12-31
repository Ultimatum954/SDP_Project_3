document.getElementById("signup_form").addEventListener("submit", async (event) => {
    const name = document.getElementById('name').value;
   const email =  document.getElementById('email').value;
   const pass =  document.getElementById('password').value;
   console.log(pass);

   try {
    const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, pass }),
    });

    const result = await response.json();

    if (response.ok) {
        alert("Sign-up successful!");

    } else {
        alert(`Error: ${result.message}`);
    }
} catch (error) {
    console.error("Error during sign-up:", error);
    alert("An error occurred. Please try again later.");
}
   
});

