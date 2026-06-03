# RUP

Estructura de documentacion RUP del proyecto Breñotask, organizada a partir de
los artefactos de SdR y preparada para continuar con diseño, desarrollo y
pruebas.

## Disciplinas

- [00-casos-uso](./00-casos-uso/README.md): requisitos, modelo del dominio,
  actores, contexto, detalle y prototipos.
- [01-analisis](./01-analisis/README.md): analisis de casos de uso y plantillas
  MVC.
- [02-diseño](./02-diseño/README.md): decisiones de diseño y arquitectura.
- [03-desarrollo](./03-desarrollo/README.md): seguimiento de implementacion por
  caso de uso.
- [04-pruebas](./04-pruebas/README.md): escenarios y pruebas por caso de uso.
- [99-seguimiento](./99-seguimiento/README.md): dashboard y control de avance.

## Criterio de organizacion

La capa `00-casos-uso` conserva los datos de SdR. La capa `01-analisis`
mantiene los analisis existentes y deja las plantillas de colaboracion y
secuencia preparadas para convertir cada caso al estilo MVC de pySigHor.
