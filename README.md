# Eindopdracht-CommonHero

Installatiehandleiding

Jaime van der Peijl
Full-Stack Software Development
Novi Hogeschool, Utrecht
Inhoudsopgave

###Het is aan te raden om, in plaats van dit ReadMe bestand, de meegeleverde PDF te lezen. Deze bevat meer informatie.

##Inleiding
CommonHero is een web applicatie voor iedereen. Het is daarom noodzakelijk dat de applicatie ook door iedereen te begrijpen is. Uiteraard zal dit een stuk makkelijker worden als niet iedereen (zoals nu) eerst allemaal programa’s hoeft te installeren om uberhaubt iets te kunnen zien. Maar, dat  is op dit moment nog toekomst muziek.

Na het inleveren van dit project ben ik van plan verder aan de slag te gaan met CommonHero om dit online te krijgen en verder uit te werken. Uiteindelijk is het hoofddoel van CommonHero om mensen die hulp nodig hebben te verbinden met de mensen die dat willen bieden. Om dit effectief te kunnen doen is nog veel nodig. Maar wat je zult zien is hiervoor hopelijk een mooie basis.

“Als iedereen nou eens 5 minuten van de dag zou besteden om een vreemde te helpen. Hoe zou de wereld er dan uitzien?”

##Gebruikers
Er zijn twee gebruikers vantevoren geconfigureerd. Deze kunnen gelijk gebruikt worden om de webapplicatie te testen. Zowel de USER als de ADMIN hebben namen gekregen in plaats van de gebruikelijke ‘user’ en ‘admin’ aangezien deze ook in de webapplicatie worden getoond bij de vacatures.

Rol
Toelichting
ADMIN
Deze gebruiker kan alle vacatures wijzigen en verwijderen. Ook heeft deze gebruiker toegang tot de Admin pagina (“/gebruikers/admin”) waar die gebruikers een rol kan toewijzen of afnemen.
USER
Deze gebruiker kan vacatures toevoegen en eigen vacatures wijzigen en verwijderen. Deze gebruiker heeft geen toegang tot de admin pagina.


Rol
Gebruikersnaam
Wachtwoord
ADMIN
Jaime
wachtwoord’
USER
Erik
wachtwoord



##Endpoints
Frontend applicatie:

Pagina
URL
Home
“/”
Profile
“/profile”
Sign In
“/signin”
Sign Up
“/signup”
Hulp Aanbieden
“/hulp-aanbieden”
Hulp Vragen
“/hulp-vragen”
Admin pagina
“/gebruikers/admin”
Vacature maken
“/vacmaken”
Vacature pagina
“/:vactype/:id”
Mijn vacatures
“mijnvacs”


Backend:
Gebruiker
Request
Functie
EndPoint
Uitleg / voorbeeld
Authenticate (POST)
/ Sign In:
“/authenticate”
{
“username”: admin“,
“password”: “wachtwoord”
}
Als ‘response’ van de sign in functie krijg je een JWT-token. Deze kun je vervolgens gebruiken bij de volgende functies.
GET
getUser
“gebruikers/{username}”
Zoek een gebruiker op
POST
createUser
“gebruikers/signup”
{
“username”: gebruiker“,
“password”: “$2a$12$Un2aO49GQ7cbSVh8h/ydAe.KXyhUFjoNYePhUZXs6Gk6laOYv64le”,
“email”: “jaime.vanderpeijl@novi-education.nl”,
“name”: “gebruiker”,
“city”: “Utrecht”,
“enabled” : true,
}
Hierboven zie je dat bij het wachtwoord al het (Bcrypt) versleutelde wachtwoord voor ‘wachtwoord’ wordt ingevoerd.
PUT
updateUser
“gebruikers/{username}”
{
“username”: gebruiker“,
“email”: “andere-mail@novi-education.nl”,
“name”: “andere-gebruiker”,
“city”: “andere-stad”,
}
DELETE
deleteUser:
“gebruikers/del/{username}”
Verwijder een gebruiker
POST
assignPhotoToUser
“gebruikers/{username}/photo”
Met behulp van ‘formData’ in de body kun je een afbeelding toevoegen bij de gebruiker. Vul dan ook bij username de gebruikersnaam in van deze gebruiker.
GET
getUserAuthorities
“gebruikers/{username}/authorities”
Vraag de authorities op van een gebruiker.
POST
addUserAuthority
“gebruikers/{username}/authorities/{authority}”
Voeg de authorities toe bij een gebruiker.
DELETE
deleteUserAuthority
“gebruikers/{username}/authorities/{authority}”
Verwijder authorities bij een gebruiker.


Vacatures
Request
Functie
EndPoint
Voorbeeld
GET
getVacancies
“{vactype}”
Vraag alle vacatures op. {vactype} kan ‘search’ of ‘ offer’ zijn aanvankelijk of je hulp wilt aanbieden of wilt zoeken.
GET
getVacancy
“{vactype}/{id}”
Vraag een specifieke vacature op/
POST
createVacancy
“{vactype}”


{
“publisher”: gebruiker“,
“title”: “kies een mooie titel”,
“hours”: “5”,
“city”: “Utrecht”,
“description”: “Hier komt het hele verhaal te staan.”,
“repeats”: “Dagelijks”,
“date” : “2022-01-01”,
}
PUT
updateVacancy
“{vactype}”
{
“publisher”: gebruiker“,
“title”: “kies nog een mooie titel”,
“hours”: “1”,
“city”: “Amsterdam”,
“description”: “Nu kun je hier weer iets anders verzinnen!.”,
“repeats”: “Wekelijks”,
“date” : “2022-12-12”,
}
DELETE
deleteVacancy
“{vactype}/{id}”
Verwijder de vacature
POST
assignPhotoToVacancy
“{vactype}/{id}/photo”
Met behulp van ‘formData’ in de body kun je een afbeelding toevoegen bij de vacature. Vul nu bij id, het id in van de vacature.


##Stappenplan
Er zijn een aantal dingen noodzakelijk om de webapplicatie te kunnen runnen:

IDE (bijv IntelliJ en WebStorm)
Postman (Om de endpoints van de backend pagina te testen)
PGAdmin. De database maakt gebruik van PostgreSQL (Om de database te runnen)
Een goede internet connectie

Vervolgens zijn er een aantal stappen die je moet doorlopen om de applicatie te kunnen gebruiken en te testen.
Fontend
Clone de applicatie vanuit GitHub
Frontend:
HTTPS: https://github.com/Jaimepeijl/Eindopdracht-CommonHero.git
SSH: git@github.com:Jaimepeijl/Eindopdracht-CommonHero.git


Gebruik je IDE om de nodige packages te downloaden en installeren:
npm install - dit zorgt ervoor dat je alle NPM packages installeert.
npm start - Dit zorgt ervoor dat de applicatie op jouw lokale server draait.


Als de applicatie niet vanzelf start, open dan http://localhost:3000 om de applicatie te zien.
Om alle functionaliteiten te gebruiken heb je de backend ook nodig. Kijk vooral even bij onderstaande stappen om ook deze te runnen.
Database (PgAdmin)
Open de applicatie PgAdmin.
Log in met de gegevens die je hebt ingevoerd bij de installatie.
Klik bij de server aan de linkerkant met de rechtermuisknop op databases.
Klik op create en dan database.
Voer “commonhero” in bij naam en druk op save.
Start nu de backend zoals hieronder beschreven. Als je bij stap drie bent kun je de stappen hieronder eerst volgen:
Klik links onder de server(s) op PostgreSQL met de rechtermuisknop en selecteer Properties.
Ga naar Connection. Hier kun je de volgende velden vinden:j Host name/addres, Port en Username. Deze kun je gebruiken voor stap 3 in de backend.

Backend
Clone de applicatie vanuit GitHub
Backend:
HTTPS: https://github.com/Jaimepeijl/Jaimepeijl-Eindopdracht-CommonHero-backend.git
SSH: git@github.com:Jaimepeijl/Jaimepeijl-Eindopdracht-CommonHero-backend.git

Start de server in PgAdmin


Pas de gegevens aan in je application.properties bestand (resources directory).
Ga verder bij Database stap 6.a en 6.b.
De gegevens staan standaard op:
Username: postgres
Password: commonhero
De applicatie staat ook op ‘create drop’ dit kun je aanpassen naar ‘update’ om de applicatie uitvoeriger te testen.
Mocht je het host-adres en/of het poortnummer hebben gewijzigd in PgAdmin, pas deze dan aan.
Vul helemaal boven bij ‘my.upload_location’ een folder in op jouw pc waar het project is opgeslagen. Hierin worden eventuele afbeeldingen vanuit de frontend gedownload.


Run de webapplicatie door op het driehoekige ‘play’ knopje te drukken.
Om alle functionaliteiten te gebruiken heb je de frontend ook nodig. Kijk vooral even bij bovenstaande stappen om ook deze te runnen.


