import {
    CalcularIdade,
    VerificarFaixaEtaria,
    CalcularMetrosParaCentimetros
} from './src/scripts/calculadoras.js';
import { VerificarEntrada } from './src/rules/rules.js';

function encerrar(mensagem) {
    console.error(`\nACESSO NEGADO: ${mensagem}`);
    process.exitCode = 1;
}

const argumentos = process.argv.slice(2);

if (argumentos.length !== 6) {
    console.log('Uso: node App.js "Nome" "AAAA-MM-DD" altura_em_metros "Brinquedo" "AAAA-MM-DD" "Acompanhante"');
    console.log('Se a pessoa nao tiver acompanhante, informe "" no ultimo argumento.');
    process.exitCode = 1;
} else {
    const [nome, nascimento, alturaTexto, brinquedo, dataVisita, acompanhante] = argumentos;

    try {
        const alturaMetros = Number(alturaTexto);
        if (!nome.trim()) throw new Error('Informe o nome da pessoa.');
        if (!Number.isFinite(alturaMetros) || alturaMetros <= 0) throw new Error('Altura invalida. Informe a altura em metros, por exemplo 1.70.');

        const idade = CalcularIdade(nascimento, dataVisita);
        const faixaEtaria = VerificarFaixaEtaria(idade);
        const altura = CalcularMetrosParaCentimetros(alturaMetros);
        const precisaAcompanhante = idade < 18 || idade >= 65;

        console.log(`Visitante: ${nome}`);
        console.log(`Idade: ${idade} anos (${faixaEtaria})`);
        console.log(`Altura: ${altura} cm`);
        console.log(`Data da visita: ${dataVisita}`);

        if (precisaAcompanhante && !acompanhante.trim()) {
            encerrar(`${faixaEtaria} precisa estar acompanhado(a) para entrar no parque.`);
        } else {
            if (precisaAcompanhante) console.log(`Acompanhante: ${acompanhante}`);

            const pessoa = { nome, idade, altura };
            const resultado = VerificarEntrada(JSON.stringify(pessoa), brinquedo);

            if (!resultado.valido || !resultado.permitido) {
                encerrar(resultado.mensagens.join(' '));
            } else {
                console.log(`\nACESSO PERMITIDO: ${nome} pode entrar em ${brinquedo}.`);
            }
        }
    } catch (erro) {
        encerrar(erro.message);
    }
}
