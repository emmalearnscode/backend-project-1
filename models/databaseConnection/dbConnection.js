const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/genericStoreDB.sqlite",
});

//User.create({ email: "test@test.com", passwordHash: "qwertyuiop123" });
const ingredients = `Asparagus
Broccoli
Carrots
Cauliflower
Celery
Corn
Cucumbers
Lettuce 
Mushrooms
Onions
Peppers
Potatoes
Spinach
Squash
Zucchini
Tomatoes
Fresh fruits
Apples
Avocados
Bananas
Berries
Cherries
Grapefruit
Grapes
Kiwis
Melon
Oranges
Peaches
Nectarines
Pears
Plums
Bagels
Chip dip
English muffins
Eggs / Fake eggs
Fruit juice
Hummus
Ready-bake breads
Tofu
Tortillas
Burritos
Fish sticks
Ice cream
Sorbet
Popsicles
Fries
BBQ sauce
Gravy
Honey
Hot sauce
Jam
Ketchup
Mustard
Mayonnaise
Relish
Salad dressing
Salsa
Soy sauce
Steak sauce
Syrup
Worcestershire sauce
Bouillon cubes
Cereal
Coffee
Lemons
Limes
Olive oil
Pancake Mix
Waffle mix
Pasta
Peanut butter
Pickles
Rice
Tea
Vegetable oil
Vinegar
Applesauce
Baked beans
Chili
Fruit
Olives
Tinned meats
Canned Tuna
Tomatoes
Veggies
Basil
Black pepper
Cilantro
Cinnamon
Garlic
Ginger
Mint
Oregano
Paprika
Parsley
Red pepper
Salt
Spice mix
Vanilla extract
Butter
Margarine
Cottage cheese
Milk
Sour cream
Whipped cream
Yogurt
Cheese
Bleu cheese
Cheddar
Cottage cheese
Cream cheese
Feta
Goat cheese
Mozzarella
Parmesan
Provolone
Ricotta
Swiss Cheese
Bacon
Sausage
Beef
Chicken
Ground beef
Turkey
Ham
Hot dogs, YEAH!
Turkey
Catfish
Crab
Lobster
Mussels
Oysters
Salmon
Shrimp
Tilapia
Tuna
Cod
Beer
Club soda
Champagne
Gin
Juice
Mixers
Red wine
White wine
Rum
Saké
Soda pop
Sports drink
Whiskey
Vodka
Bagels
Croissants
Buns
Cake
Cookies
Donuts
Fresh bread
Sliced bread
Pie! Pie! Pie!
Pita bread
Baking powder
Baking soda
Bread crumbs
Cake Mix
Chocolate chips
Cocoa
Flour
Sugar
Sugar substitute
Yeast
Cookies
Crackers
Dried fruit
Granola bars
Nuts
Seeds
Oatmeal
Popcorn
Potato chips
Pretzels
`.split("\n");

const ingredientsArr = ingredients.map((ingredient) => ({
  item: ingredient,
}));

//Ingredient.bulkCreate(ingredientsArr);
//sequelize.sync();

module.exports = {
  sequelize,
  Op,
};
