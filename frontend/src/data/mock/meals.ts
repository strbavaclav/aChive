export type Meal = {
  id: number;
  name: string;
  level: string;
  time: string;
  category: string;
  origin?: string;
  preparationTime?: number;
  description?: string;
  badges?: string[];
  image?: string;
  nutrition?: nutritions;
  instructions?: string[];
  ingredients?: string[];
};

type nutritions = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const difficulty = {
  1: "easy",
  2: "moderate",
  3: "hard",
};

export const Meals: Meal[] = [
  {
    id: 0,
    name: "Feta scrambled eggs",
    level: difficulty["1"],
    time: "10 min",
    category: "Breakfast",
    description:
      "Scrambled eggs are always a great idea. This version with spinach, tomatoes and salty feta is great for any time of a day",
    badges: [
      "one pot",
      "post-workout",
      "<5 ingredients",
      "mediterranean",
      "gluten-free",
      "high-protein",
      "low carb",
      "vitamin A",
      "vitamin B12",
      "vitamin K",
      "vitamin D",
      "Calcium",
      "Potassium",
      "Magnesium",
      "Antioxidants",
      "Vegetarian",
    ],
    ingredients: [
      "3 eggs",
      "100 g low-fat feta cheese",
      "1 diced tomato",
      "40 g fresh spinach",
      "1 tsp coconut oil",
      "optional: grated nutmeg, unrefined salt, black pepper",
    ],
    nutrition: {
      calories: 488,
      protein: 45,
      carbs: 6,
      fat: 30,
    },
    instructions: [
      "Heat coconut oil in a pan. Cook tomatoes and spinach on medium heat for 2 minutes, or until spinach softens.",
      "Crack eggs into pan and cook for approx. 4 minutes, or until desired consistency.",
      "Add grated nutmeg, salt and pepper.",
      "Crumble feta cheese over warm eggs.",
    ],
    image:
      "https://foodhub.scene7.com/is/image/woolworthsltdprod/Scrambled-Eggs:Mobile-1300x1150",
  },
  {
    id: 1,
    name: "One Pot Chicken Korma",
    level: difficulty["3"],
    time: "25 min",
    category: "Lunch/Dinner",
    ingredients: [
      "80 g boneless chicken breast",
      "0.5 sliced onions",
      "0.5 cloves chopped garlic",
      "5 g minced ginger ",
      "1 tbsp tomato puree",
      "0.5 tsp garam masala",
      "0.5 tsp cayenne pepper",
      "0.5 tsp chilly flakes",
      "60 g brown rice",
      "300 ml water",
      "20 g raisins",
      "40 g fresh spinach",
      "10 g roasted pine nuts",
      "0.5 bunches fresh cilantro (coriander)",
      "1 tbsp fat free yogurt",
      "0.5 tsp coconut oil",
      "Optional: unrefined salt, black pepper",
    ],
    image:
      "https://pinchofyum.com/wp-content/uploads/Chicken-Tikka-Masala.jpg?fbclid=IwAR17Iaen-t3Ivqedo16ozMC1MnuPP7qpBel8lo3lazGMQcrlDBQbnV4YteM",
  },
  {
    id: 2,
    name: "Overnight oatmeal",
    level: difficulty["1"],
    time: "5 min",
    category: "Breakfast",
    image:
      "https://static01.nyt.com/images/2018/08/29/dining/ko-overnight-oats-horizontal/ko-overnight-oats-horizontal-superJumbo-v2.jpg",
  },
  {
    id: 3,
    name: "Green Smoothie",
    level: difficulty["3"],
    time: "10 min",
    category: "Snack",
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2022/12/green-smoothie-recipes.jpg",
  },
  {
    id: 4,
    name: "Healthy Quesadilla",
    level: difficulty["3"],
    time: "10 min",
    category: "Snack",
    image:
      "https://midwestfoodieblog.com/wp-content/uploads/2023/04/FINAL-chicken-quesadilla-1-2.jpg",
  },
  {
    id: 5,
    name: "Banana quark",
    level: difficulty["3"],
    time: "10 min",
    category: "Snack",
    image:
      "https://media02.stockfood.com/largepreviews/NjM3NDk5NQ==/00205645-Low-fat-quark-with-sliced-banana.jpg",
  },
  {
    id: 6,
    name: "Herb Salmon w/ dried tomatoes",
    level: difficulty["3"],
    time: "30 min",
    category: "Dinner",
    ingredients: [
      "10 g butter",
      "1 clove garlic",
      "1 bounch fresh herbs (parsley, thyme, rosemery, basil...)",
      "1/2 tsp lemon juice",
      "1 pinch tsp lemon crunch",
      "1 salmon fille",
      "150 g small potatoes",
      "10 g dried tomatoes",
      "Optional: unrefined salt, black pepper",
    ],
    instructions: [
      "Troubu předehřejte na 180 °C. Na pánvi rozpusťte 30 g másla a nechte na něm chvíli rozvonět nasekaný stroužek česneku. Dejte stranou lehce vychladnout.",
      "Nyní do másla vmíchejte hrst nasekaných bylinek. Může to být směs italských bylinek. Dále přidejte kůru z citronu a také lžičku citronové šťávy. Směsí potřete filety z lososa, položte je na plech a pečte přibližně 15 minut.",
      "Opláchněte 600 g menších brambor, podle potřeby je rozkrojte a i se slupkou je promíchejte s olejem ze sušených rajčat. Rozprostřete je na plechu, posolte a vložte do trouby. Pečte je 20 minut, pak přidejte na plátky nakrájený česnek a vložte do trouby ještě na 10 dalších minut. Sušená rajčata nakrájejte na kousky, nasekejte k nim rozmarýn, opepřete a smíchejte ještě zatepla s upečenými bramborami.",
    ],
    image:
      "https://www.mynaturalfamily.com/wp-content/uploads/baked-salmon-with-lemon.jpg",
  },
  {
    id: 7,
    name: "Healthy Beef Teriyaki",
    level: difficulty["3"],
    time: "30 min",
    category: "Dinner",
    ingredients: [
      "1 cup rice",
      "1 soy sauce",
      "1 mirin seasoning sauce",
      "1 water",
      "2 tbsp stevia",
      "1 spring onion",
      "1/2 onion",
      "beef mince",
      "few edamame beans",
      "1 tbsp sesamee seeds",
    ],
    instructions: [
      "Cook rice",
      "Prepare Teriyaki sauce. Soy sauce, mirin, water and stevia mix together.",
      "place the sauce in the pan and add spring onion and onion",
      "cook the minced beef",
      "On the end put inside the more green vegies and sesamee seeds",
    ],
    image:
      "https://www.theseasonedmom.com/wp-content/uploads/2023/02/Beef-Teriyaki-Recipe-3.jpg",
  },
];
