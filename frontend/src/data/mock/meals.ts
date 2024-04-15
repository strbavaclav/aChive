export type Meal = {
  id: number;

  level: string;
  time: string;
  category: string;
  origin?: string;
  preparationTime?: number;
  bestTimeToEat: string;

  badges?: string[];
  image?: string;
  nutrition?: nutritions;

  size: string;
  cs: {
    name: string;
    description?: string;
    instructions?: string[];
    ingredients?: string[];
  };
  en: {
    name: string;
    description?: string;
    instructions?: string[];
    ingredients?: string[];
  };
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
  // Feta scrambled eggs (already complete)
  {
    id: 0,
    level: "difficulty['1']",
    time: "10 min",
    category: "Breakfast",
    origin: "Mediterranean",
    preparationTime: 10,
    size: "S",
    bestTimeToEat: "09:00",
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
    nutrition: {
      calories: 488,
      protein: 45,
      carbs: 6,
      fat: 30,
    },
    image:
      "https://foodhub.scene7.com/is/image/woolworthsltdprod/Scrambled-Eggs:Mobile-1300x1150",
    cs: {
      name: "Vajíčka se fetou",
      description:
        "Vajíčka jsou vždy skvělou volbou. Tato verze se špenátem, rajčaty a slaným sýrem feta je skvělá v kteroukoli dobu dne.",
      instructions: [
        "Na pánvi zahřejte kokosový olej. Rajčata a špenát vařte na střední teplotě 2 minuty nebo dokud špenát nezměkne.",
        "Do pánve rozbijte vejce a vařte přibližně 4 minuty, nebo dokud nebudou mít požadovanou konzistenci.",
        "Přidejte strouhaný muškátový oříšek, sůl a pepř.",
        "Nasypeme rozdrobený sýr feta na teplá vajíčka.",
      ],
      ingredients: [
        "3 vejce",
        "100 g sýr feta s nízkým obsahem tuku",
        "1 nakrájené rajče",
        "40 g čerstvého špenátu",
        "1 čajová lžička kokosového oleje",
        "volitelné: strouhaný muškátový oříšek, nerafinovaná sůl, černý pepř",
      ],
    },
    en: {
      name: "Feta scrambled eggs",
      description:
        "Scrambled eggs are always a great idea. This version with spinach, tomatoes, and salty feta is great for any time of the day.",
      instructions: [
        "Heat coconut oil in a pan. Cook tomatoes and spinach on medium heat for 2 minutes, or until spinach softens.",
        "Crack eggs into pan and cook for approx. 4 minutes, or until desired consistency.",
        "Add grated nutmeg, salt and pepper.",
        "Crumble feta cheese over warm eggs.",
      ],
      ingredients: [
        "3 eggs",
        "100 g low-fat feta cheese",
        "1 diced tomato",
        "40 g fresh spinach",
        "1 tsp coconut oil",
        "optional: grated nutmeg, unrefined salt, black pepper",
      ],
    },
  },
  // One Pot Chicken Korma (added missing details)
  {
    id: 1,
    level: "difficulty['3']",
    time: "25 min",
    category: "Lunch/Dinner",
    origin: "Indian",
    preparationTime: 25,
    size: "L",
    badges: ["one pot", "low fat", "high protein"],
    bestTimeToEat: "14:00",
    nutrition: {
      calories: 550,
      protein: 40,
      carbs: 30,
      fat: 20,
    },
    image:
      "https://pinchofyum.com/wp-content/uploads/Chicken-Tikka-Masala.jpg?fbclid=IwAR17Iaen-t3Ivqedo16ozMC1MnuPP7qpBel8lo3lazGMQcrlDBQbnV4YteM",
    cs: {
      name: "Kuřecí Korma v jednom hrnci",
      description:
        "Zjednodušená verze klasického bohatého a krémového kormy, ideální pro rychlé a exotické jídlo.",
      instructions: [
        "V hrnci zahřejte kokosový olej. Restujte cibuli, česnek a zázvor, dokud cibule nezezlátne.",
        "Přidejte kuřecí prsa a zlehka je opečte ze všech stran.",
        "Přidejte rajčatový protlak, garam masala, kajenský pepř a chilli vločky. Vařte 5 minut.",
        "Přidejte vodu a hnědou rýži, přiveďte k varu, pak vařte na mírném ohni 15 minut.",
        "Přimíchejte špenát, rozinky a piniové oříšky. Vařte dalších 5 minut.",
        "Podávejte ozdobené čerstvým koriandrem a lžící jogurtu.",
      ],
      ingredients: [
        "80 g kuřecích prsou bez kosti",
        "0.5 cibule nakrájené",
        "0.5 stroužků česneku nasekaného",
        "5 g zázvoru nasekaného",
        "1 lžíce rajčatového protlaku",
        "0.5 lžičky garam masaly",
        "0.5 lžičky kajenského pepře",
        "0.5 lžičky chilli vloček",
        "60 g hnědé rýže",
        "300 ml vody",
        "20 g rozinek",
        "40 g čerstvého špenátu",
        "10 g pražených piniových oříšků",
        "0.5 svazku čerstvého koriandru",
        "1 lžíce jogurtu bez tuku",
        "0.5 lžičky kokosového oleje",
        "Volitelné: nerafinovaná sůl, černý pepř",
      ],
    },
    en: {
      name: "One Pot Chicken Korma",
      description:
        "A simplified version of the classic rich and creamy korma, perfect for a quick yet exotic meal.",
      instructions: [
        "Heat coconut oil in a pot. Sauté onions, garlic, and ginger until onions are translucent.",
        "Add chicken breast and brown lightly on all sides.",
        "Mix in tomato puree, garam masala, cayenne pepper, and chilly flakes. Cook for 5 minutes.",
        "Add water and brown rice, bring to a boil, then simmer for 15 minutes.",
        "Stir in spinach, raisins, and pine nuts. Cook for an additional 5 minutes.",
        "Serve garnished with fresh cilantro and a dollop of yogurt.",
      ],
      ingredients: [
        "80 g boneless chicken breast",
        "0.5 sliced onions",
        "0.5 cloves chopped garlic",
        "5 g minced ginger",
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
    },
  },
  // Overnight oatmeal (added details)
  {
    id: 2,
    level: "difficulty['1']",
    time: "5 min",
    category: "Breakfast",
    origin: "American",
    preparationTime: 480, // Prepares overnight, 8 hours
    size: "S",
    badges: ["easy prep", "vegetarian", "gluten-free"],
    bestTimeToEat: "09:00",
    nutrition: {
      calories: 250,
      protein: 6,
      carbs: 45,
      fat: 5,
    },
    image:
      "https://static01.nyt.com/images/2018/08/29/dining/ko-overnight-oats-horizontal/ko-overnight-oats-horizontal-superJumbo-v2.jpg",
    cs: {
      name: "Ovesná kaše přes noc",
      description:
        "Snadná ovesná kaše připravovaná přes noc, ideální pro rychlý a výživný začátek dne s volitelnými přísadami.",
      instructions: [
        "Smíchejte ovesné vločky s mlékem nebo jogurtem ve sklenici na zavařování.",
        "Přidejte sladidla jako je med nebo javorový sirup a volitelné ovoce nebo ořechy.",
        "Uzavřete sklenici a nechte v lednici přes noc.",
        "Druhý den ráno podávejte chlazené s čerstvým ovocem.",
      ],
      ingredients: [
        "1 šálek ovesných vloček",
        "1 šálek mléka nebo řeckého jogurtu",
        "2 lžíce medu nebo javorového sirupu",
        "Volitelné: čerstvé ovoce, ořechy",
      ],
    },
    en: {
      name: "Overnight oatmeal",
      description:
        "Easy overnight oats, perfect for a quick, nutritious start to your day with customizable toppings.",
      instructions: [
        "Combine oats with your choice of milk or yogurt in a mason jar.",
        "Add sweeteners like honey or maple syrup, and optional fruits or nuts.",
        "Seal the jar and leave in the refrigerator overnight.",
        "Enjoy chilled the next morning, topped with fresh fruits.",
      ],
      ingredients: [
        "1 cup rolled oats",
        "1 cup milk or Greek yogurt",
        "2 tbsp honey or maple syrup",
        "Optional: fresh fruits, nuts",
      ],
    },
  },
  // Green Smoothie (added details)
  {
    id: 3,
    level: "difficulty['3']",
    time: "10 min",
    category: "Snack",
    origin: "Global",
    preparationTime: 10,
    size: "XS",
    badges: ["quick prep", "vegan", "gluten-free", "low calorie", "detox"],
    bestTimeToEat: "11:00",
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 25,
      fat: 7,
    },
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2022/12/green-smoothie-recipes.jpg",
    cs: {
      name: "Zelené Smoothie",
      description:
        "Osvežující zelené smoothie plné živin, které zvýší vaše energetické hladiny.",
      instructions: [
        "Všechny ingredience kombinujte v mixéru.",
        "Mixujte na vysoké otáčky, dokud nebude smoothie hladké.",
        "Podávejte ihned, ozdobené semínky chia, pokud si přejete.",
      ],
      ingredients: [
        "1 šálek špenátu",
        "1 nakrájený banán",
        "1/2 šálku neslazeného mandlového mléka",
        "1 lžíce semínek chia",
        "1/4 šálku řeckého jogurtu (volitelné)",
      ],
    },
    en: {
      name: "Green Smoothie",
      description:
        "A revitalizing green smoothie packed with nutrients to boost your energy levels.",
      instructions: [
        "Combine all ingredients in a blender.",
        "Blend on high until smooth.",
        "Serve immediately, garnished with a sprinkle of chia seeds if desired.",
      ],
      ingredients: [
        "1 cup spinach",
        "1 sliced banana",
        "1/2 cup unsweetened almond milk",
        "1 tbsp chia seeds",
        "1/4 cup Greek yogurt (optional)",
      ],
    },
  },
  // Healthy Quesadilla (added details)
  {
    id: 4,
    level: "difficulty['3']",
    time: "10 min",
    category: "Snack",
    origin: "Mexican",
    preparationTime: 10,
    size: "M",
    badges: ["quick meal", "vegetarian", "high fiber"],
    bestTimeToEat: "16:00",
    nutrition: {
      calories: 300,
      protein: 18,
      carbs: 30,
      fat: 15,
    },
    image:
      "https://midwestfoodieblog.com/wp-content/uploads/2023/04/FINAL-chicken-quesadilla-1-2.jpg",
    cs: {
      name: "Zdravá Quesadilla",
      description:
        "Rychlá a zdravá quesadilla, plněná sýrem a vaší volbou zeleniny pro uspokojivé svačiny.",
      instructions: [
        "Na středním plameni rozehřejte nepřilnavou pánev.",
        "Na pánev položte tortillu, posypte sýrem a přidejte vaši volbu zeleniny.",
        "Tortillu přehněte na půl, smažte dozlatova, otočte a smažte druhou stranu.",
        "Podávejte horké salsou nebo guacamole.",
      ],
      ingredients: [
        "1 celozrnná tortilla",
        "1/2 šálku strouhaného sýra mozzarella",
        "1/2 šálku směsi zeleniny (papriky, cibule, rajčata)",
        "Volitelné: salsa, guacamole",
      ],
    },
    en: {
      name: "Healthy Quesadilla",
      description:
        "A quick and healthy quesadilla, filled with cheese and your choice of vegetables for a satisfying snack.",
      instructions: [
        "Heat a non-stick skillet over medium heat.",
        "Place tortilla in skillet, sprinkle cheese and add your choice of vegetables.",
        "Fold the tortilla in half, cook until golden, flip and cook the other side.",
        "Serve hot with salsa or guacamole.",
      ],
      ingredients: [
        "1 whole wheat tortilla",
        "1/2 cup shredded mozzarella cheese",
        "1/2 cup mixed vegetables (bell peppers, onions, tomatoes)",
        "Optional: salsa, guacamole",
      ],
    },
  },
  // Banana quark (added details)
  {
    id: 5,
    level: "difficulty['3']",
    time: "10 min",
    category: "Snack",
    origin: "German",
    preparationTime: 10,
    size: "XS",
    badges: ["low fat", "high protein", "quick snack"],
    bestTimeToEat: "10:00",
    nutrition: {
      calories: 200,
      protein: 20,
      carbs: 25,
      fat: 2,
    },
    image:
      "https://media02.stockfood.com/largepreviews/NjM3NDk5NQ==/00205645-Low-fat-quark-with-sliced-banana.jpg",
    cs: {
      name: "Banánový tvaroh",
      description:
        "Jednoduchá a příjemná směs tvarohu a banánu, která tvoří krémovou a zdravou svačinu.",
      instructions: [
        "V míse smíchejte tvaroh s nakrájenými banány.",
        "Přidejte trochu medu a špetku skořice pro lepší chuť.",
        "Podávejte chlazené nebo ihned po přípravě.",
      ],
      ingredients: [
        "200 g tvarohu (nízkotučný)",
        "1 zralý banán",
        "1 lžíce medu",
        "1/4 lžičky skořice",
      ],
    },
    en: {
      name: "Banana quark",
      description:
        "A simple and delightful blend of quark and banana, making a creamy and healthy snack.",
      instructions: [
        "In a bowl, mix quark with sliced bananas.",
        "Add a drizzle of honey and a sprinkle of cinnamon for extra flavor.",
        "Serve chilled or immediately after preparation.",
      ],
      ingredients: [
        "200 g quark (low fat)",
        "1 ripe banana",
        "1 tbsp honey",
        "1/4 tsp cinnamon",
      ],
    },
  },
  // Herb Salmon w/ dried tomatoes (added details)
  {
    id: 6,
    level: "difficulty['3']",
    time: "30 min",
    category: "Dinner",
    origin: "Mediterranean",
    preparationTime: 30,
    size: "M",
    badges: ["gluten-free", "high protein", "omega-3 fatty acids"],
    bestTimeToEat: "18:00",
    nutrition: {
      calories: 500,
      protein: 40,
      carbs: 40,
      fat: 20,
    },
    image:
      "https://www.mynaturalfamily.com/wp-content/uploads/baked-salmon-with-lemon.jpg",
    cs: {
      name: "Losos s bylinkami a sušenými rajčaty",
      description:
        "Chutný losos s bylinkovou krustou podávaný s pečenými bramborami obohacenými sušenými rajčaty.",
      instructions: [
        "Předehřejte troubu na 180°C. Na pánvi rozpusťte máslo a osmahněte česnek do vůně.",
        "Přimíchejte nasekané bylinky, citronovou kůru a citronovou šťávu. Bylinkovou směs naneste na filety lososa.",
        "Lososa položte na plech a pečte asi 15 minut.",
        "Brambory promíchejte s olejem ze sušených rajčat a rozprostřete na pečicím plechu. Pečte společně s lososem 20 minut.",
        "Přidejte nakrájený česnek, nasekaný rozmarýn a sušená rajčata k pečeným bramborám a pečte dalších 10 minut.",
      ],
      ingredients: [
        "1 filet lososa",
        "10 g másla",
        "1 stroužek česneku",
        "Svazek čerstvých bylinek (petržel, tymián, rozmarýn, bazalka)",
        "1/2 lžičky citronové kůry",
        "1/2 lžičky citronové šťávy",
        "150 g malých brambor",
        "10 g sušených rajčat",
        "Volitelné: nerafinovaná sůl, černý pepř",
      ],
    },
    en: {
      name: "Herb Salmon with Dried Tomatoes",
      description:
        "Flavorful herb-coated salmon served with a side of roasted potatoes and enriched with dried tomatoes.",
      instructions: [
        "Preheat oven to 350°F (180°C). Melt butter in a skillet and sauté garlic until fragrant.",
        "Stir in chopped herbs, lemon zest, and lemon juice. Apply the herb mixture to the salmon fillets.",
        "Place salmon on a baking sheet and bake for about 15 minutes.",
        "Toss potatoes with oil from dried tomatoes and spread on a baking sheet. Roast alongside salmon for 20 minutes.",
        "Mix sliced garlic, chopped rosemary, and dried tomatoes with the roasted potatoes and bake for an additional 10 minutes.",
      ],
      ingredients: [
        "1 salmon fillet",
        "10 g butter",
        "1 clove garlic",
        "A bunch of fresh herbs (parsley, thyme, rosemary, basil)",
        "1/2 tsp lemon zest",
        "1/2 tsp lemon juice",
        "150 g small potatoes",
        "10 g dried tomatoes",
        "Optional: unrefined salt, black pepper",
      ],
    },
  },
  // Healthy Beef Teriyaki (added details)
  {
    id: 7,
    level: "difficulty['3']",
    time: "30 min",
    category: "Dinner",
    origin: "Japanese",
    preparationTime: 30,
    size: "L",
    badges: ["low calorie", "high protein", "low sugar"],
    bestTimeToEat: "17:00",
    nutrition: {
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 15,
    },
    image:
      "https://www.theseasonedmom.com/wp-content/uploads/2023/02/Beef-Teriyaki-Recipe-3.jpg",
    en: {
      name: "Healthy Beef Teriyaki",
      description:
        "A lighter take on the classic teriyaki, featuring lean beef and a homemade sauce, perfect for a quick dinner.",
      instructions: [
        "Cook rice according to package instructions.",
        "Combine soy sauce, mirin, water, and stevia in a small bowl to make the teriyaki sauce.",
        "Heat oil in a skillet, add spring onions and onion, and sauté until soft.",
        "Add minced beef and cook until browned.",
        "Pour the teriyaki sauce over the beef and simmer for 5 minutes.",
        "Serve over cooked rice, topped with edamame beans and sprinkled with sesame seeds.",
      ],
      ingredients: [
        "1 cup rice",
        "1 cup soy sauce",
        "1 cup mirin seasoning sauce",
        "1 cup water",
        "2 tbsp stevia",
        "1 spring onion",
        "1/2 onion",
        "300 g beef mince",
        "1/4 cup edamame beans",
        "1 tbsp sesame seeds",
      ],
    },
    cs: {
      name: "Zdravé hovězí teriyaki",
      description:
        "Lehčí varianta klasického teriyaki s libovým hovězím masem a domácí omáčkou, ideální pro rychlou večeři.",
      instructions: [
        "Uvařte rýži podle pokynů na obalu.",
        "V malé misce smíchejte sójovou omáčku, mirin, vodu a stévii, abyste získali teriyaki omáčku.",
        "Zahřejte olej v pánvi, přidejte jarní cibulku a cibuli a orestujte doměkka.",
        "Přidejte mleté hovězí maso a vařte dozlatova.",
        "Plijte teriyaki omáčku na hovězí maso a duste 5 minut.",
        "Podávejte na uvařené rýži, ozdobené fazolemi edamame a posypané sezamovými semínky.",
      ],
      ingredients: [
        "1 hrnek rýže",
        "1 hrnek sójové omáčky",
        "1 hrnek omáčky mirin",
        "1 hrnek vody",
        "2 lžíce stévie",
        "1 jarní cibulka",
        "1/2 cibule",
        "300 g mletého hovězího masa",
        "1/4 hrnku fazolí edamame",
        "1 lžíce sezamových semínek",
      ],
    },
  },
  // Add three new meals
  {
    id: 8,
    level: "difficulty['1']",
    time: "5 min",
    category: "Breakfast",
    origin: "American",
    preparationTime: 5,
    size: "S",
    badges: ["quick meal", "vegetarian", "high fiber"],
    bestTimeToEat: "14:00",
    nutrition: {
      calories: 300,
      protein: 10,
      carbs: 30,
      fat: 18,
    },
    image:
      "https://hips.hearstapps.com/del.h-cdn.co/assets/17/02/1600x900/hd-aspect-1484172644-guac.jpg?resize=1200:*",
    en: {
      name: "Spicy Avocado Toast",
      description:
        "A trendy and satisfying breakfast option, avocado toast with a spicy kick from sriracha and topped with poached egg.",
      instructions: [
        "Toast your choice of bread until golden brown.",
        "Mash an avocado and mix with lime juice, salt, and sriracha.",
        "Spread the avocado mix on the toasted bread.",
        "Top with a poached egg and a sprinkle of chili flakes.",
      ],
      ingredients: [
        "1 slice whole grain bread",
        "1 ripe avocado",
        "1 tbsp lime juice",
        "1/2 tsp sriracha",
        "1 egg",
        "Salt, chili flakes",
      ],
    },
    cs: {
      name: "Pikantní toast s avokádem",
      description:
        "Trendová a vydatná snídaňová volba, toast s avokádem a pikantním nádechem srirachi, navrch s pošírovaným vejcem.",
      instructions: [
        "Opékejte si vybraný chléb dozlatova.",
        "Rozmačkejte avokádo a smíchejte ho s limetkovou šťávou, solí a srirachou.",
        "Rozmačkejte avokádovou směs na toastu.",
        "Na vrch položte pošírované vejce a posypte chilli flakes.",
      ],
      ingredients: [
        "1 krajíček celozrnného chleba",
        "1 zralé avokádo",
        "1 lžíce limetkové šťávy",
        "1/2 lžičky srirachi",
        "1 vejce",
        "Sůl, chilli flakes",
      ],
    },
  },
  {
    id: 9,
    level: "difficulty['2']",
    time: "45 min",
    category: "Dinner",
    origin: "French",
    preparationTime: 45,
    size: "M",
    badges: ["family favorite", "gluten-free", "high protein"],
    bestTimeToEat: "14:00",
    nutrition: {
      calories: 410,
      protein: 50,
      carbs: 5,
      fat: 22,
    },
    image:
      "https://minimalistbaker.com/wp-content/uploads/2022/09/Lemon-Herb-Roasted-Chicken-Thighs-SQUARE-500x500.jpg",
    cs: {
      name: "Pečené kuře s citronem a bylinkami",
      description:
        "Šťavnaté pečené kuře ochucené citronem a bylinkami, ideální pro srdečnou rodinnou večeři.",
      instructions: [
        "Troubu předehřejte na 200°C.",
        "Kuře potřete směsí citronové kůry, nasekaných bylinek, česneku, soli a pepře.",
        "Kuře vložte do pekáče a pečte asi 35 minut nebo dokud není propečené.",
        "Podávejte s pečenou zeleninou.",
      ],
      ingredients: [
        "1 celé kuře (asi 1,5 kg)",
        "1 lžíce citronové kůry",
        "1 lžíce nasekaných čerstvých bylinek (tymián, rozmarýn)",
        "2 stroužky česneku, nasekané",
        "Sůl, černý pepř",
        "Volitelné: kořenová zelenina pro pečení",
      ],
    },
    en: {
      name: "Lemon Herb Roasted Chicken",
      description:
        "Juicy roasted chicken seasoned with lemon and herbs, perfect for a hearty family dinner.",
      instructions: [
        "Preheat oven to 400°F (200°C).",
        "Rub chicken with a mixture of lemon zest, chopped herbs, garlic, salt, and pepper.",
        "Place chicken in a roasting pan and roast for about 35 minutes or until cooked through.",
        "Serve with roasted vegetables.",
      ],
      ingredients: [
        "1 whole chicken (about 1.5 kg)",
        "1 tbsp lemon zest",
        "1 tbsp chopped fresh herbs (thyme, rosemary)",
        "2 cloves garlic, minced",
        "Salt, black pepper",
        "Optional: root vegetables for roasting",
      ],
    },
  },
];
