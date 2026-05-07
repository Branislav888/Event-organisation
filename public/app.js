console.log("app.js beží ✔");

fetch("http://localhost:3000/contracts")
  .then(response => response.json())
  .then(data => {

    console.log("📦 CELÉ DATA:");
    console.log(data);

    if (!data.content) {
      console.log("❌ Žiadne content pole:", data);
      return;
    }

    data.content.forEach(contract => {

      console.log("-----------------------------");

      console.log("🆔 ID:", contract.businessId ?? "N/A");
      console.log("🏷️ LABEL:", contract.label ?? contract.name ?? "N/A");
      console.log("📅 START:", contract.startTime ?? "N/A");
      console.log("📅 END:", contract.endTime ?? "N/A");
      console.log("📌 STATUS:", contract.status ?? "N/A");
      console.log("👤 CUSTOMER:", contract.customer ?? "N/A");
      console.log("🏢 OPERATOR:", contract.operatorName ?? "N/A");

    });

  })
  .catch(error => {
    console.error("❌ ERROR:", error);
  });