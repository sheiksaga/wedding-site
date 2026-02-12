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
            { text: 'ett event för att koppla samman unga advokater med mentorer', value: 'hidden5' },
            { text: 'ett miljöhackathon för att hjälpa företag', value: 'answer5' },
            { text: 'en rymdstation på månen', value: 'boring' },
            { text: 'ett labb där man beräknar "the three body problem"', value: 'complex' }
        ]
    },
    {
        id: 'dropdown6',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'skratt', value: 'answer6' },
            { text: 'uppåt', value: 'ups' },
            { text: 'vänster', value: 'lefts' },
            { text: 'skämt', value: 'answer6' }
        ]
    },
    {
        id: 'dropdown7',
        options: [
            { text: 'Välj...', value: '' },
            { text: 'höger', value: 'rights' },
            { text: 'mitten', value: 'middles' },
            { text: 'skratt', value: 'answer7' },
            { text: 'skämt', value: 'answer7' }
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
            { text: 'let it be, let it be, let it be, let it be.', value: 'answer10' },
            { text: 'heal the world, and make it a better place.', value: 'answer10' },
            { text: 'get up, stand up. stand up for your rights.', value: 'answer10' },
            { text: 'lyssna på fler låtar tillsammans.', value: 'answer10' }
        ],
        hiddenOptions: [
            { text: 'Välj...', value: '' },
            { text: 'inte riktigt säker på vad de håller på med', value: 'hiddenAnswer' }
        ]
    }
];

const quizPartsSv = [ ' och ', ' träffades i ', ' år ', '. De träffades på ', ', men lyckades hitta varandra istället. De har varit tillsammans ett tag genom många ', ' och ', ', med familjens kärlek, ', ', och deras husdjur ', ', de är nu redo att ' ];
