
#Weather App

##Descripción
Weather App es una aplicación web que te permite buscar ciudades y obtener información sobre el clima actual y pronóstico extendido. Puedes agregar tus ciudades favoritas y ver el clima de hasta 3 ciudades diferentes.

##Instalación
Clona el repositorio:

git clone [URL del repositorio]

Instala las dependencias:

npm install

##Ejecución
Desarrollo
Para ejecutar la aplicación en el entorno de desarrollo, utiliza el siguiente comando:
ng serve

La aplicación estará disponible en http://localhost:4200/.

Producción
Para generar una versión optimizada para producción, utiliza el siguiente comando:

ng build --prod

Esto generará los archivos en la carpeta dist/. Luego, puedes servir estos archivos utilizando un servidor HTTP, por ejemplo, con http-server:

npm install -g http-server
http-server dist/

La aplicación estará disponible en http://localhost:8080/.

##Compatibilidad con Navegadores
La aplicación ha sido probada y es compatible con los siguientes navegadores:

Google Chrome (última versión)
Mozilla Firefox (última versión)
Microsoft Edge (última versión)

##Contribuciones
Si deseas contribuir al proyecto, sigue los siguientes pasos:

Crea un nuevo fork del repositorio.

Crea una nueva rama para tu funcionalidad o corrección de errores:

git checkout -b mi-nueva-funcionalidad

Realiza los cambios necesarios y commitea tus cambios:

git commit -m "Agregada nueva funcionalidad"

Realiza un push de tu rama al repositorio remoto:

git push origin mi-nueva-funcionalidad

Abre un Pull Request en GitHub y describe los cambios que has realizado.

##Licencia
Este proyecto se distribuye bajo la Licencia MIT.