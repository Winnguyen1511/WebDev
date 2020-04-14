function Pizza(options)
{
    this.size = options.size||5;
    this.cheese = options.cheese ||false;
    this.tomato = options.tomato ||false;
    this.bacon = options.bacon ||false;
}

function Options(size, cheese=false, tomato=false, bacon=false)
{
    this.size = size;
    this.cheese = cheese;
    this.tomato = tomato;
    this.bacon = bacon;
}
pizza = new Pizza(new Options());
console.log(pizza)