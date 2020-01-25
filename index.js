const servername="http://localhost";
const port=3000;

function buscarTemps(){
    let url = `${servername}:${port}/temperaturas`;
    const tabla = document.querySelector("#temperaturas tbody");
    
    fetch(url)
        .then(res=>res.json())
        .then(temperaturas=>{
            tabla.innerHTML =`
                <tr>
                    <th>Timestamp</th>
                    <th> Temp</th>
                </tr>`;
                temperaturas.forEach(temp => {
                    tabla.innerHTML += `
                        <tr>
                            <td>${temp.time.split(', ')[1]}</td>
                            <td>${temp.temp}</td>
                        </tr>`;
                });
        });
}
buscarTemps();

const form = document.querySelector("#setTarget");
form.onsubmit = function(e){
    e.preventDefault();

    const newTarget = {
        temp : document.querySelector('input[name="temp"]').value,
        enable : 1
    };
    fetch(`${servername}:${port}/target`,{
        method:'put',
        body:JSON.stringify(newTarget),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(data =>{
        const tituloTarget = document.querySelector("#targetTemp");
        tituloTarget.innerHTML = `Target: ${data[0].temp} °${data[0].unit}`;
        console.log(data);
    });
}

setInterval(buscarTemps,500);