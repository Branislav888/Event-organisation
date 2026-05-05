const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://localhost:9080/capacity-manager/v2/de_studentui/occupancy/facilities", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));