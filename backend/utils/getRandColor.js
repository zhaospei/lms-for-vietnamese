import randomInteger from 'random-int';

const RAND_COLORS = ['#7bb8ea', '#FFBC99', '#FFD88D', '#B5E4CA', '#CABDFF', '#B1E5FC', '#E0C9C1', '#EFEF98', "#F5A56D",
"#CC66FF", "#F7CECE", "#8BEFB8", "#9BC2E6", "#CC66FF", "#BAAB7E", "#F2EBE6", "#B7C8D4"
]

export function getRandColor() {
    return RAND_COLORS[randomInteger(0, RAND_COLORS.length - 1)]
}
