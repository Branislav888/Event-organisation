console.log("app.js beží ✔");

fetch("http://localhost:3000/contracts")
  .then(response => response.json())
  .then(data => {

    console.log("CELÉ DATA:");
    console.log(data);

    if (data.content) {
      data.content.forEach(contract => {
        console.log("ID:", contract.businessId);
        console.log("NAME:", contract.name);
      });
    } else {
      console.log("Žiadne content pole:", data);
    }

  })
  .catch(error => {
    console.error("ERROR:", error);
  });