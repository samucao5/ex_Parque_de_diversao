/**
 * Converte uma data no formato AAAA-MM-DD em um Date UTC.
 * Evita diferencas de fuso horario durante os calculos.
 */
function converterData(data) {
    const partes = String(data).split('-').map(Number);

    if (partes.length !== 3 || partes.some(Number.isNaN)) {
        throw new Error('Data invalida. Use o formato AAAA-MM-DD.');
    }

    const [ano, mes, dia] = partes;
    const resultado = new Date(Date.UTC(ano, mes - 1, dia));

    if (
        resultado.getUTCFullYear() !== ano ||
        resultado.getUTCMonth() !== mes - 1 ||
        resultado.getUTCDate() !== dia
    ) {
        throw new Error('A data informada nao existe.');
    }

    return resultado;
}

/**
 * Retorna a idade inteira arredondada para cima, conforme solicitado no enunciado.
 * A data de visita e opcional; quando omitida, utiliza a data atual.
 */
export function CalcularIdade(dataNascimento, dataVisita = new Date().toISOString().slice(0, 10)) {
    const nascimento = converterData(dataNascimento);
    const visita = converterData(dataVisita);
    const diferenca = visita.getTime() - nascimento.getTime();

    if (diferenca < 0) {
        throw new Error('A data de nascimento nao pode ser posterior a data da visita.');
    }

    const diasPorAno = 365.2425;
    return Math.ceil(diferenca / (diasPorAno * 24 * 60 * 60 * 1000));
}

export function VerificarFaixaEtaria(idade) {
    if (idade < 18) return 'criança';
    if (idade <= 25) return 'Jovem Adulto';
    if (idade < 65) return 'adulto';
    return 'idoso';
}

export function CalcularMetrosParaCentimetros(alturaEmMetros) {
    const altura = Number(alturaEmMetros);

    if (!Number.isFinite(altura) || altura <= 0) {
        throw new Error('A altura deve ser um numero positivo, em metros.');
    }

    return altura * 100;
}
