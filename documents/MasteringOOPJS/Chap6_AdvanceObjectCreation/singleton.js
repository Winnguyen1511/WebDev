function Person(name, surname)
{
    this.name = name;
    this.surname = surname;
    return {firstname : name, secondname : surname};
    // return "this is constructor";
}

var johnSmith = new Person("John", "Smith");
console.log(johnSmith)
console.log(johnSmith.name);
console.log(johnSmith.surname);


//Using singleton to create object that we only want to create
//one time in usage:

var IdGenerator = (
    function(){
        var instance;
        var counter = 0;
        class IdGeneratorClass
        {
            constructor(name)
            {
                if(!instance)
                {
                    this.name = name;
                    instance = this;
                }
                return instance;
            }
            newId()
            {
                return ++counter;
            }
        }
        return IdGeneratorClass;
    }()
);

var g = new IdGenerator("khoa");
console.log(g)
console.log(g.newId())
console.log(g.newId())

var g1 = new IdGenerator()
console.log(g1)
console.log(g1.newId())
console.log(g1 === g)