"use strict"

window.onload = function() {
	const lstMarche = document.getElementById("lstMarche");
	const lstModelli = document.getElementById("lstModelli");
	const table = document.querySelector("table");
	const tbody = document.querySelector("tbody");
	const dettagli = document.getElementsByClassName("details")[0];
	const txts = dettagli.querySelectorAll("input[type=text]");

	table.style.display = "none";
	dettagli.style.display = "none";

	getMarche();
	btnAggiorna.addEventListener("click", aggiornaPrezzo);

	function getMarche() {
		const request = inviaRichiesta("GET", "/marche");

		request.catch(errore);
		request.then((httpResponse) => {
			const marche = httpResponse.data;

			for (const marca of marche) {
				const opt = document.createElement("option");
				opt.value = marca.id;
				opt.textContent = marca.nome;
				lstMarche.appendChild(opt);
			}
			lstMarche.selectedIndex = -1;
			lstMarche.addEventListener("change", function() { getModelli(this.value); });
		});
	}

	function getModelli(idMarca) {
		const request = inviaRichiesta("GET", "/modelli", {"codMarca": idMarca});

		request.catch(errore);
		request.then((httpResponse) => {
			const modelli = httpResponse.data;
			
			lstModelli.innerHTML = "";
			for (const modello of modelli) {
				const opt = document.createElement("option");
				opt.value = modello.id;
				opt.textContent = modello.nome;
				lstModelli.appendChild(opt);
			}
			lstModelli.selectedIndex = -1;
			lstModelli.addEventListener("change", function() { getAutomobili(this.value); });
		});
	}

	function getAutomobili(idModello) {
		let request = inviaRichiesta("GET", "/modelli", {"id": idModello});

		request.catch(errore);
		request.then((httpResponse) => {
			const modello = httpResponse.data[0];

			request = inviaRichiesta("GET", "/automobili", {"codModello": idModello});
	
			request.catch(errore);
			request.then((httpResponse) => {
				const automobili = httpResponse.data;
				
				tbody.innerHTML = "";
				for (const auto of automobili) {
					const tr = document.createElement("tr");
					tbody.appendChild(tr);
	
					let td = document.createElement("td");
					td.textContent = modello.nome;
					tr.appendChild(td);
	
					td = document.createElement("td");
					td.textContent = modello.alimentazione;
					tr.appendChild(td);

					td = document.createElement("td");
					td.textContent = auto.colore;
					tr.appendChild(td);

					td = document.createElement("td");
					td.textContent = auto.anno;
					tr.appendChild(td);

					td = document.createElement("td");
					const img = document.createElement("img");
					img.src = `./img/${auto.img}`;
					img.style.height = "65px";
					td.appendChild(img);
					tr.appendChild(td);

					td = document.createElement("td");
					let btn = document.createElement("button");
					btn.classList.add("btn", "btn-success");
					btn.textContent = "Dettagli";
					const infoModello = {
						"nome": modello.nome,
						"alimentazione": modello.alimentazione,
						"cilindrata": modello.cilindrata
					};
					btn.addEventListener("click", function() { visualizzaDettagli(auto, infoModello) });
					td.appendChild(btn);
					tr.appendChild(td);

					td = document.createElement("td");
					btn = document.createElement("button");
					btn.classList.add("btn", "btn-secondary");
					btn.textContent = "Elimina";
					td.appendChild(btn);
					tr.appendChild(td);
				}
				table.style.display = "block";
			});
		});
	}
	
	function visualizzaDettagli(auto, infoModello) {
		txts[0].value = auto.id;
		txts[1].value = infoModello.nome;
		txts[2].value = infoModello.alimentazione;
		txts[3].value = infoModello.cilindrata;
		txts[4].value = auto.targa;
		txts[5].value = auto.colore;
		txts[6].value = auto.anno;
		txts[7].value = auto.km;
		txts[8].value = auto.prezzo;

		dettagli.style.display = "flex";
	}

	function aggiornaPrezzo() {
		const id = txts[0].value;
		const prezzo = txts[8].value;
		const request = inviaRichiesta("PATCH", "/automobili/" + id, {prezzo});

		request.catch(errore);
		request.then((httpResponse) => {
			alert("Prezzo aggiornato con successo!");
		});
	}
}