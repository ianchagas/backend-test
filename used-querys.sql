/*
*
* Script criado para atualizar o saldo, utilizando soma cumulativa/consecutiva
* O script basicamente inicia um "saldo" com o primeiro valor de contrato (entrada)
* Para cada "row" ele soma/subtrai o "saldo" atual com valor de contrato ou com parcelas (pagamentos)
*
*/

WITH tabela_auxiliar
     AS (SELECT id,
                data_movimento,
                novo_saldo,
                Sum(novo_saldo)
                  OVER (
                    ORDER BY data_movimento ASC, id) AS soma_consecutiva
         FROM   (WITH operacao_valor
                      AS (SELECT id,
                                 data_movimento,
                                 CASE
                                   WHEN dr.valor_comprado IS NOT NULL THEN
                                   'soma'
                                   WHEN dr.valor_pago IS NOT NULL THEN 'subtrai'
                                 END AS operacao,
                                 CASE
                                   WHEN dr.valor_comprado IS NOT NULL THEN
                                   dr.valor_comprado
                                   WHEN dr.valor_pago IS NOT NULL THEN
                                   dr.valor_pago
                                 END AS valor
                          FROM   data_register dr
                          GROUP  BY id)
                 SELECT operacao_valor.id,
                        operacao_valor.data_movimento,
                        Sum(CASE
                              WHEN operacao_valor.operacao = 'soma' THEN
                              operacao_valor.valor
                              ELSE -operacao_valor.valor
                            END) AS novo_saldo
                  FROM   data_register
                         JOIN operacao_valor
                           ON operacao_valor.id = data_register.id
                  GROUP  BY 1,
                            2
                  ORDER  BY operacao_valor.data_movimento ASC) AS test
         GROUP  BY 1,
                   2,
                   3)
UPDATE data_register
SET    saldo = tabela_auxiliar.soma_consecutiva
FROM   tabela_auxiliar
WHERE  data_register.id = tabela_auxiliar.id 


/*
*
* Script criado para buscar o campo "mes" que traz mês e ano junto com o maior valor em aberto do histórico do cliente
*
*/

SELECT 
      TO_CHAR(data_movimento, 'MM/YYYY') AS mes,
      (SELECT Max(saldo)
      FROM   data_register dr
      WHERE  dr.id = data_register.id) AS total_aberto
FROM data_register
ORDER BY 2 DESC
LIMIT 1 