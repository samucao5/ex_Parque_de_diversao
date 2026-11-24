import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const caminhoRules = fileURLToPath(new URL('./rules.json', import.meta.url));
const dadosRules = JSON.parse(readFileSync(caminhoRules, 'utf8'));

/** Avalia comparacoes simples do tipo X > 18 ou X >= 170, sem usar eval(). */
function avaliarRegra(valor, expressao) {
    const correspondencia = expressao.match(/^X\s*(>=|<=|>|<|===|==)\s*(-?\d+(?:\.\d+)?)$/);

    if (!correspondencia) {
        throw new Error(`Regra nao reconhecida: ${expressao}`);
    }

    const [, operador, limiteTexto] = correspondencia;
    const limite = Number(limiteTexto);

    switch (operador) {
        case '>': return valor > limite;
        case '>=': return valor >= limite;
        case '<': return valor < limite;
        case '<=': return valor <= limite;
        case '==':
        case '===': return valor === limite;
        default: return false;
    }
}

/**
 * Recebe os dados da pessoa como texto JSON e o nome do brinquedo.
 * Retorna { valido, permitido, mensagens }.
 */
export function VerificarEntrada(pessoaEmTexto, nomeBrinquedo) {
    let pessoa;

    try {
        pessoa = JSON.parse(pessoaEmTexto);
    } catch {
        return { valido: false, permitido: false, mensagens: ['Os dados da pessoa nao estao em um JSON valido.'] };
    }

    const parque = dadosRules.Parque;
    const brinquedo = parque.Brinquedos.find(
        item => item.nome.toLowerCase() === String(nomeBrinquedo).trim().toLowerCase()
    );

    if (!brinquedo) {
        return { valido: false, permitido: false, mensagens: [`Brinquedo "${nomeBrinquedo}" nao encontrado.`] };
    }

    const configuracao = parque.Restricoes[0];
    const restricoesBrinquedo = configuracao.Brinquedos.find(item => item.nome === brinquedo.nome);
    const mensagens = [];

    for (const nomeRegra of restricoesBrinquedo.regras) {
        const regra = configuracao.Regras.find(item => item.nome === nomeRegra);

        if (!regra) {
            mensagens.push(`A regra "${nomeRegra}" nao foi configurada.`);
            continue;
        }

        const valor = Number(pessoa[regra.campo]);
        if (!Number.isFinite(valor) || !avaliarRegra(valor, regra.regra)) {
            mensagens.push(`Restricao nao atendida: ${nomeRegra} (${regra.regra}).`);
        }
    }

    return {
        valido: true,
        permitido: mensagens.length === 0,
        mensagens: mensagens.length ? mensagens : [`Requisitos atendidos para ${brinquedo.nome}.`]
    };
}
