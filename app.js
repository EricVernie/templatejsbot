var builder = require('botbuilder');


var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

// bot.dialog('/', function (session) {

//     session.send("You said: " + session.message.text);
// });

var CortanaLuisRecognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c413b2ef-382c-45bd-8ff0-f76d60e2a821?subscription-key=3cea665036ba4a5a92f0026694e70c7c");
var LuisRecognizer = new builder.LuisRecognizer("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e3ff792a-5c36-40fa-8f6e-3681c6064d95?subscription-key=3cea665036ba4a5a92f0026694e70c7c&verbose=true");

bot.dialog('/', new builder.IntentDialog({ recognizers: [LuisRecognizer,CortanaLuisRecognizer]})
    .matches('Issue', (session,args) => {
        session.send("Issue");
    })
    .matches('builtin.intent.places.make_reservation', 
        function(session, args) {
            session.send('Welcome to the restaurant reservation');
            for (var i in args.entities)
            {
                var e = args.entities[i];
                session.send(e.type);
                session.send(e.entity);
            }            
        }
    )
);