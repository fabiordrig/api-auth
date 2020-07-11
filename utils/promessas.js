function promessaChaveValor(promessa, chave) {
	return promessa.then( (valor) => {
		return new Promise( (resolve, reject) => {
			resolve( {'__nome_promessa__': chave, data: valor} )
		});
	})
}

const retornaErro = (mensagem) => {
	let respErro = {
	  erro: true,
	  mensagem: mensagem
	}  
	return Promise.resolve(respErro)
}

module.exports = {
	promessaChaveValor,
	retornaErro
}