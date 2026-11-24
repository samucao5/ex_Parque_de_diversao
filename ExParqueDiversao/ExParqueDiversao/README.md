# Exercicio Parque de Diversao

Projeto em Node.js com ES Modules (`import`/`export`).

## Estrutura

- `App.js`: recebe os seis argumentos e coordena as verificacoes.
- `src/scripts/calculadoras.js`: idade, faixa etaria e conversao de metros para centimetros.
- `src/rules/rules.json`: brinquedos e regras.
- `src/rules/rules.js`: valida as regras do brinquedo escolhido.

## Executar

Abra o terminal na pasta `ExParqueDiversao` e execute:

```bash
node App.js "Ana" "2000-04-15" 1.75 "Montanha Russa" "2026-11-24" ""
```

Os seis argumentos sao, nesta ordem:

1. Nome
2. Data de nascimento (`AAAA-MM-DD`)
3. Altura em metros
4. Nome do brinquedo
5. Data da visita (`AAAA-MM-DD`)
6. Nome do acompanhante (use `""` quando nao houver)

Tambem e possivel executar com `npm start --` seguido dos seis argumentos.

## Regras implementadas conforme o enunciado

- Menor de 18 anos ou pessoa com 65 anos ou mais precisa informar acompanhante.
- Casa Assombrada: idade `> 18` e altura `>= 170` cm.
- Montanha Russa: altura `>= 170` cm.
- Carrinho de bate-bate: sem restricoes cadastradas.

## Observacao sobre o calculo da idade

O enunciado pede idade inteira arredondada para cima. Por isso, `CalcularIdade` usa `Math.ceil` sobre o tempo transcorrido em anos (365,2425 dias por ano). Isso pode considerar a pessoa como tendo completado o proximo ano antes do aniversario exato. Se a intencao da atividade era idade civil/completa, troque por calculo baseado em ano, mes e dia.
