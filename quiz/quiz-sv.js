/*
========================================
  QUIZ DATA - SWEDISH
========================================
- Swedish quiz content and data
- Answer options and hidden mode content
*/

const quizDataSv = [
    {
        id: 'dropdown1',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'Tanja', value: 'answer1' },
            { text: 'Tennia', value: 'Tennis' },
            { text: 'Toy-Nia', value: 'Toy-Nia' },
            { text: 'Michelle Obama', value: 'hidden1' }
        ]
    },
    {
        id: 'dropdown2',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'Sangeeth', value: 'answer2' },
            { text: 'Squash', value: 'Squash' },
            { text: 'Soy-Nia', value: 'Soy-Nia' },
            { text: 'Barack Obama', value: 'hidden2' }
        ]
    },
    {
        id: 'dropdown3',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'Jönköping', value: 'Jönköping' },
            { text: 'Chicago', value: 'hidden3' },
            { text: 'Göteborg', value: 'answer3' },
            { text: 'Gränna', value: 'Gränna' }
        ]
    },
    {
        id: 'dropdown4',
        options: [
            { text: 'Välj...', value: '' },
            { text: '1994', value: '1994' },
            { text: '2025', value: '2025' },
            { text: '2018', value: 'answer4' },
            { text: '1989', value: 'hidden4' }
        ]
    },
    {
        id: 'dropdown5',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'en advokatbyråevenemang för att koppla samman unga advokater och mentorer', value: 'hidden5' },
            { text: 'en miljöhackathon för att hjälpa företag', value: 'answer5' },
            { text: 'en rymdstation på månen', value: 'boring' },
            { text: 'ett labb medan man beräknar krångligheterna i tre-kroppars-problemet', value: 'complex' }
        ]
    },
    {
        id: 'dropdown6',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'slingor', value: 'answer6' },
            { text: 'uppåt', value: 'ups' },
            { text: 'vänster', value: 'lefts' },
            { text: 'svängar', value: 'answer6' }
        ]
    },
    {
        id: 'dropdown7',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'höger', value: 'rights' },
            { text: 'mitten', value: 'middles' },
            { text: 'slingor', value: 'answer7' },
            { text: 'svängar', value: 'answer7' }
        ]
    },
    {
        id: 'dropdown8',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'vänner', value: 'answer8' },
            { text: 'kritik', value: 'criticism' },
            { text: 'likgiltighet', value: 'indifference' },
            { text: 'tryck', value: 'pressure' }
        ]
    },
    {
        id: 'dropdown9',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'Bo och Sandy', value: 'hidden6' },
            { text: 'Doggie', value: 'Doggie' },
            { text: 'Nilo', value: 'answer9' },
            { text: 'det finns ingen doggie', value: 'trick' }
        ]
    },
    {
        id: 'dropdown10',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'låt det vara, låt det vara, låt det vara, låt det vara.', value: 'answer10' },
            { text: 'läka världen och göra den till en bättre plats.', value: 'answer10' },
            { text: 'resa dig upp, stå upp, stå upp för dina rättigheter.', value: 'answer10' },
            { text: 'lyssna på fler låtar tillsammans.', value: 'answer10' }
        ],
        hiddenOptions: [
            { text: 'Välj...', value: '' },
            { text: 'inte riktigt säker på vad de håller på med', value: 'hiddenAnswer' }
        ]
    }
];

const quizPartsSv = [ ' och ', ' träffades i ', ' i ', '. De träffades på ', ', men lyckades hitta varandra istället. De har varit tillsammans ett tag genom mycket ', ' och ', ', men med familjens kärlek, ', ', och deras husdjur doggie ', ', de är nu redo att ' ];
