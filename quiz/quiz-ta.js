/*
========================================
  QUIZ DATA - TAMIL
========================================
- Tamil quiz content and data
- Answer options and hidden mode content
*/

const quizDataTa = [
    {
        id: 'dropdown1',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'தன்ஜா', value: 'answer1' },
            { text: 'டெனியா', value: 'Tennis' },
            { text: 'டாய்-னியா', value: 'Toy-Nia' },
            { text: 'மிச்செல் ஒபாமா', value: 'hidden1' }
        ]
    },
    {
        id: 'dropdown2',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'சங்கீத்', value: 'answer2' },
            { text: 'ஸ்குவாஷ்', value: 'Squash' },
            { text: 'சோய்நியா', value: 'Soy-Nia' },
            { text: 'பரக் ஒபாமா', value: 'hidden2' }
        ]
    },
    {
        id: 'dropdown3',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'யோன்கோபிங்', value: 'Jönköping' },
            { text: 'சிகாகோ', value: 'hidden3' },
            { text: 'கோத்தன்பேர்க்', value: 'answer3' },
            { text: 'க்ரென்னா', value: 'Gränna' }
        ]
    },
    {
        id: 'dropdown4',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: '1994', value: '1994' },
            { text: '2025', value: '2025' },
            { text: '2018', value: 'answer4' },
            { text: '1989', value: 'hidden4' }
        ]
    },
    {
        id: 'dropdown5',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'இளம் வழக்கறிஞர்கள் மற்றும் வழிகாட்டிகளை இணைக்கும் ஒரு சட்ட நிறுவனம் நிகழ்வு', value: 'hidden5' },
            { text: 'நிறுவனங்களுக்கு உதவும் ஒரு சுற்றுச்சூழல் ஹக்கத்தான்', value: 'answer5' },
            { text: 'சந்திரன் மீது ஒரு விண்வெளி நிலையம்', value: 'boring' },
            { text: 'மூன்று-உடல் பிரச்சினையை கணக்கிட்டு கொண்டிருந்த ஆய்வுகூடம்', value: 'complex' }
        ]
    },
    {
        id: 'dropdown6',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'முறுக்கல்கள்', value: 'answer6' },
            { text: 'மேலே', value: 'ups' },
            { text: 'இடப்பக்கம்', value: 'lefts' },
            { text: 'திருப்பங்கள்', value: 'answer6' }
        ]
    },
    {
        id: 'dropdown7',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'வலப்பக்கம்', value: 'rights' },
            { text: 'நடு', value: 'middles' },
            { text: 'முறுக்கல்கள்', value: 'answer7' },
            { text: 'திருப்பங்கள்', value: 'answer7' }
        ]
    },
    {
        id: 'dropdown8',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'நண்பர்கள்', value: 'answer8' },
            { text: 'விமர்சனம்', value: 'criticism' },
            { text: 'பராமரவையாமை', value: 'indifference' },
            { text: 'அழுத்தம்', value: 'pressure' }
        ]
    },
    {
        id: 'dropdown9',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'போ மற்றும் சாண்டி', value: 'hidden6' },
            { text: 'டாக்கி', value: 'Doggie' },
            { text: 'நிலோ', value: 'answer9' },
            { text: 'நாய் எதுவுமில்லை', value: 'trick' }
        ]
    },
    {
        id: 'dropdown10',
        options: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'அதை விடு, அதை விடு, அதை விடு, அதை விடு.', value: 'answer10' },
            { text: 'உலகத்தை குணப்படுத்தி, அதை ஒரு சிறந்த இடமாக மாற்றுவோம்.', value: 'answer10' },
            { text: 'எழுந்திரு, நிமிர்ந்து நில், உன் உரிமைக்காக நில்.', value: 'answer10' },
            { text: 'மேலும் பல பாடல்களை ஒன்றாகக் கேள்.', value: 'answer10' }
        ],
        hiddenOptions: [
            { text: 'தேர்வு செய்...', value: '' },
            { text: 'அவர்கள் என்ன செய்கிறார்கள் என்பதை நிச்சயமாகத் தெரியவில்லை', value: 'hiddenAnswer' }
        ]
    }
];

const quizPartsTa = [
    ' மற்றும் ',
    ' சந்தித்தது ',
    ' இல் ',
    '. அவர்கள் முதலில் சந்தித்த இடம் ',
    ', ஆனால் அதற்குப் பதிலாக அவர்கள் ஒருவரை ஒருவர் கண்டுபிடித்தனர். அவர்கள் பல ',
    ' மற்றும் ',
    ' ஆகியவற்றைக் கடந்து கூடவே நீண்ட பயணம் மேற்கொண்டுள்ளனர், குடும்பத்தின் அன்பும் ',
    ', மற்றும் அவர்கள் செல்ல நாய் ',
    ' உடன், இப்போது அவர்கள் தயாராக உள்ளனர் '
];
