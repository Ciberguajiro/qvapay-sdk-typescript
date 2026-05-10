# Guía de Contribución

¡Gracias por interesarte en mejorar el SDK de QvaPay! Queremos que contribuir a este proyecto sea lo más fácil y transparente posible.

## Proceso de Desarrollo

1. **Encuentra algo en lo que trabajar**: Puedes buscar en los [Issues](https://github.com/qvapay/qvapay-ts-sdk/issues) existentes o proponer una nueva funcionalidad.
2. **Crea un Fork**: Haz un fork del repositorio en tu cuenta de GitHub.
3. **Prepara el entorno**:
   ```bash
   bun install
   ```
4. **Crea una rama**: Utiliza un nombre descriptivo, como `fix/error-en-login` o `feature/nuevo-servicio`.
5. **Escribe tu código**: Asegúrate de seguir las guías de estilo y de añadir comentarios en español si es necesario.
6. **Verifica los tipos**:
   ```bash
   bun x tsc --noEmit
   ```
7. **Haz commit de tus cambios**: Utiliza mensajes claros y concisos.
8. **Envía un Pull Request**: Describe detalladamente tus cambios y qué problemas solucionan.

## Guías de Estilo

- Usamos **TypeScript** para todo el código fuente.
- Los nombres de variables y funciones deben estar en **camelCase**.
- Los comentarios técnicos y la documentación deben estar preferiblemente en **español**.
- Intentamos mantener una cobertura de tipos del 100%.

## Reporte de Errores

Si encuentras un error, por favor utiliza la plantilla de "Reporte de Error" en la sección de Issues de GitHub, proporcionando tantos detalles como sea posible para poder reproducirlo.

## Preguntas

Si tienes dudas, puedes abrir un Issue de tipo "Pregunta" o contactarnos a través de los canales oficiales de QvaPay.

¡Gracias por tu apoyo!
