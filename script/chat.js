// initialize by constructing a named function..chat-bubble.
// .and add text processing plugin:
var chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
  // the one that we care about is inputCallbackFn()
  // this function returns an object with some data that we can process from user input
  // and understand the context of it

  // this is an example function that matches the text user typed to one of the answer bubbles
  // this function does no natural language processing
  // this is where you may want to connect this script to NLC backend.
  inputCallbackFn: function(o) {
    // add error conversation block & recall it if no answer matched
    var miss = function() {
      chatWindow.talk(
        {
          "i-dont-get-it": {
            says: [
              "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
            ],
            reply: o.convo[o.standingAnswer].reply
          }
        },
        "i-dont-get-it"
      )
    }

    // do this if answer found
    var match = function(key) {
      setTimeout(function() {
        chatWindow.talk(convo, key) // restart current convo from point found in the answer
      }, 600)
    }

    // sanitize text for search function
    var strip = function(text) {
      return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "")
    }

    // search function
    var found = false
    o.convo[o.standingAnswer].reply.forEach(function(e, i) {
      strip(e.question).includes(strip(o.input)) && o.input.length > 0
        ? (found = e.answer)
        : found ? null : (found = false)
    })
    found ? match(found) : miss()
  }
}) // done setting up chat-bubble

// conversation object defined separately, but just the same as in the
// "Basic chat-bubble Example" (1-basics.html)
var convo = {
  "ice": {
    says: ["Hi", "Which is your favourite physics, chemistry, maths or biology?"],
    reply: [
      {
        question: "physics",
        answer: "physics"
      },
      {
        question: "chemistry",
        answer: "chemistry"
      },
      {
        question: "maths",
        answer: "maths"
      },
      {
        question: "biology",
        answer: "biology"
      }
    ]
  },
  "physics": {
    says: ["The branch of science concerned with the nature and properties of matter and energy. The subject matter of physics includes mechanics, heat, light and other radiation, sound, electricity, magnetism, and the structure of atoms."],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "chemistry": {
    says: ["Chemistry is the scientific study of the properties and behavior of matter. It is a natural science that covers the elements that make up matter to the compounds composed of atoms, molecules and ions."],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "maths": {
    says: ["It includes the study of such topics as numbers ( arithmetic and number theory ), formulas and related structures ( algebra ), shapes and spaces in which they are contained ( geometry ), and quantities and their changes ( calculus and analysis )."],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  },
  "biology": {
    says: ["This subject is the study of living organisms, divided into many specialized fields that cover their morphology, physiology, anatomy, behaviour, origin, and distribution."],
    reply: [
      {
        question: "Start Over",
        answer: "ice"
      }
    ]
  }
}

// pass JSON to your function and you're done!
chatWindow.talk(convo);