const servername = "https://smart-pava.appspot.com";
const port = 80;
const slider = document.querySelector("#target_slider");
const tituloTarget = document.querySelector("#targetTemp");
function buscarTemps() {
  let url = `${servername}:${port}/temperaturas`;
  const tabla = document.querySelector("#temperaturas tbody");

  fetch(url)
    .then(res => res.json())
    .then(temperaturas => {
      tabla.innerHTML = `
                <tr>
                    <th class="text-center p10-20">Timestamp</th>
                    <th class="text-center p10-20"> Temp</th>
                </tr>`;
      temperaturas.forEach(temp => {
        tabla.innerHTML += `
                        <tr>
                            <td class="text-center p10-20">${
                              temp.time.split(" ")[1]
                            }</td>
                            <td class="text-center p10-20">${temp.temp}</td>
                        </tr>`;
      });
    });
}
buscarTemps();

const form = document.querySelector("#setTarget");
form.onsubmit = function(e) {
  e.preventDefault();

  const newTarget = {
    temp: document.querySelector('input[name="temp"]').value,
    enable: 1
  };
  fetch(`${servername}:${port}/target`, {
    method: "put",
    body: JSON.stringify(newTarget),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      tituloTarget.innerHTML = `Target: ${data[0].temp} °${data[0].unit}`;
      console.log(data);
    });
};
function actualizarTarget() {
  tituloTarget.innerHTML = `Target: ${slider.value}°C`;
}
slider.addEventListener("change", actualizarTarget);
setInterval(buscarTemps, 500);
