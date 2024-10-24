

async function listarendereco() {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token,
    }
  });

  if (response.ok) {
    let data = await response.json();
    console.log(data.data);
    
    const enderecosDiv = document.getElementById('enderecos');
    enderecosDiv.innerHTML = ''; 

    if (data.data && data.data.length > 0) {
      data.data.forEach(endereco => {
        // Acessa os campos existentes corretamente
        const title = endereco.title || '';
        const cep = endereco.cep || '';
        const address = endereco.endereco || '';
        const numero = endereco.numero ? `Número: ${endereco.numero}` : ''; // Adiciona o número, caso exista
        const complemento = endereco.complemento ? ` - Complemento: ${endereco.complemento}` : ''; // Adiciona o complemento, caso exista

        let enderecoElement = document.createElement('p');
        enderecoElement.textContent = `${title}, CEP: ${cep}, Endereço: ${address}${numero ? `, ${numero}` : ''}${complemento}`; // Inclui título, CEP, endereço, número e complemento
        
        // Adiciona o elemento ao div de endereços
        enderecosDiv.appendChild(enderecoElement);
      });
    } else {
      enderecosDiv.textContent = "Nenhum endereço cadastrado.";
    }

  } else {
    alert("Erro ao listar endereços");
  }
}


