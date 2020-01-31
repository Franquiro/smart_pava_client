const servername = "https://smart-pava.appspot.com";
const slider = document.querySelector("#target_slider");
const tituloTarget = document.querySelector("#targetTemp");
var temps, timer, target;
function buscarTemps() {
  let url = `${servername}/temperaturas`;
  const tabla = document.querySelector("#temperaturas tbody");

  fetch(url)
    .then(res => res.json())
    .then(temperaturas => {
      temps = temperaturas;
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
  timer = setInterval(() => {
    buscarTemps();
    console.log(temps);
    if (temps[temps.length - 1].temp >= parseInt(slider.value))
      clearInterval(timer);
  }, 1000);
  const newTarget = {
    temp: document.querySelector('input[name="temp"]').value,
    enable: 1
  };
  fetch(`${servername}/target`, {
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
  target = slider.value;
  tituloTarget.innerHTML = `Target: ${target} °C`;
}
slider.addEventListener("change", actualizarTarget);
