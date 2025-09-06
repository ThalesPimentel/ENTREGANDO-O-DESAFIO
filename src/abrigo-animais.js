class AbrigoAnimais {

  constructor(){
    this.animal = {
      'Rex': {tipo: 'cão', brinquedos: ['RATO', 'BOLA']},
      'Mimi': {tipo: 'gato', brinquedos: ['BOLA', 'LASER']}, 
      'Fofo': {tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER']}, 
      'Zero': {tipo: 'gato', brinquedos: ['RATO', 'BOLA']},
      'Bola': {tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO']}, 
      'Bebe': {tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA']},
      'Loco': {tipo: 'jabuti', brinquedos: ['SKATE', 'RATO']}  
    };

    this.brinquedosValidos = new Set(['RATO', 'BOLA', 'NOVELO', 'LASER', 'CAIXA', 'SKATE']);
  }



  Entradas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais){
    const lista1 = brinquedosPessoa1.split(',');
    const lista2 = brinquedosPessoa2.split(',');
    const ordem = ordemAnimais.split(',');

    for(const lista of [lista1, lista2]){
      for(const brinquedo of lista){
        if(!this.brinquedosValidos.has(brinquedo)){
          return {erro: 'Brinquedo inválido'};
        }
      }
      if(new Set(lista).size !== lista.length){
        return {erro: 'Brinquedo inválido'};
      }
    }

    if(new Set(ordem).size !== ordem.length){
      return {erro: 'Animal inválido'};
    }

    for(const NomeAnimal of ordem){
      if(!this.animal[NomeAnimal]){
        return {erro: 'Animal inválido'};
      }
    }
    
    return {brinquedosPessoa1: lista1, brinquedosPessoa2: lista2, ordemAnimais: ordem};
  }



  PodeAdotar(brinquedosPessoa, nomeAnimal){
    const animal = this.animal[nomeAnimal];
    if(!animal){
      return false;
    }

    const brinquedosNecessarios = animal.brinquedos;

    if(nomeAnimal === 'Loco'){
      return brinquedosNecessarios.every(b => brinquedosPessoa.includes(b));
    }

    if(animal.tipo === 'gato'){
      if(brinquedosPessoa.length !== brinquedosNecessarios.length){
        return false;
      }
      return brinquedosPessoa.every((brinquedo, i) => brinquedo === brinquedosNecessarios[i]);
    }

    let BrinquedosIndexNecessarios = 0;
    for(let i = 0; i < brinquedosPessoa.length; i++){
      if(brinquedosPessoa[i] === brinquedosNecessarios[BrinquedosIndexNecessarios]){
        BrinquedosIndexNecessarios++;
      }
      if(BrinquedosIndexNecessarios === brinquedosNecessarios.length){
        return true;
      }
    }

    return false;
  }



  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const dadosValidados = this.Entradas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);
    
    if (dadosValidados.erro) {
      return { erro: dadosValidados.erro };
    }
    
    const {brinquedosPessoa1, brinquedosPessoa2, ordemAnimais } = dadosValidados;

    const adocoesPessoa1 = [];
    const adocoesPessoa2 = [];
    const resultados = {};

    const animaisNormais = ordemAnimais.filter(nome => nome !== 'Loco');
    const processarLoco = ordemAnimais.includes('Loco');

    for (const nomeAnimal of animaisNormais) {
      const aptoPessoa1 = this.PodeAdotar(brinquedosPessoa1, nomeAnimal) && adocoesPessoa1.length < 3;
      const aptoPessoa2 = this.PodeAdotar(brinquedosPessoa2, nomeAnimal) && adocoesPessoa2.length < 3;

      if (aptoPessoa1 && aptoPessoa2) {
        resultados[nomeAnimal] = 'abrigo';
      } else if (aptoPessoa1) {
        resultados[nomeAnimal] = 'pessoa 1';
        adocoesPessoa1.push(nomeAnimal); 
      } else if (aptoPessoa2) {
        resultados[nomeAnimal] = 'pessoa 2';
        adocoesPessoa2.push(nomeAnimal);
      } else {
        resultados[nomeAnimal] = 'abrigo';
      }
    }

    if (processarLoco) {
      const aptoPessoa1 = this.PodeAdotar(brinquedosPessoa1, 'Loco') && adocoesPessoa1.length < 3;
      const aptoPessoa2 = this.PodeAdotar(brinquedosPessoa2, 'Loco') && adocoesPessoa2.length < 3;

      if (aptoPessoa1 && aptoPessoa2) {
        resultados['Loco'] = 'abrigo';
      } else if (aptoPessoa1) {
        resultados['Loco'] = 'pessoa 1';
      } else if (aptoPessoa2) {
        resultados['Loco'] = 'pessoa 2';
      } else {
        resultados['Loco'] = 'abrigo';
      }
    }

    const listaFinal = Object.keys(resultados)
      .sort()
      .map(nomeAnimal => `${nomeAnimal} - ${resultados[nomeAnimal]}`);

    return { lista: listaFinal };
  }

}

export { AbrigoAnimais as AbrigoAnimais };
