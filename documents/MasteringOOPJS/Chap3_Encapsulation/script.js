var greeting = "hello world";
function greets(person)
{
    var fullName = person.name +" "+person.surname;
    return function()
    {
        console.log(greeting + " " + fullName);
    }
    
}
var displayGreating = greets({name:"khoa", surname:"nguyen"});
displayGreating();

console.log("Simple class with OOP encapsulation:");

class ThreatreSeats
{
    constructor()
    {
        var seats = [];
        this.placePerson = function(person)
        {
            seats.push(person);
        }
        this.countOccupiedSeats = function(){
            return seats.length;
        }
        this.maxSize = 10;
    }

    isSoldOut()
    {
        return this.countOccupiedSeats() >= this.maxSize;
    }
    countFreeSeats()
    {
        return this.maxSize - this.countOccupiedSeats();
    }
}

let theatre = new ThreatreSeats();
theatre.placePerson("khoa");
theatre.placePerson("hien");
console.log(theatre.countFreeSeats());

console.log("IIFE meta-closure:")

var Person = (
    function(){
        var private = {};
        var id = 0;
        function PersonConstructor(name, age)
        {
            this.id = id++;
            private[this.id] = {};
            private[this.id].name = name;
            private[this.id].age = age;
        }
        PersonConstructor.prototype.setName = function(name)
        {
            private[this.id].name = name;
        }
        PersonConstructor.prototype.setAge = function(age)
        {
            private[this.id].age = age;
        }
        PersonConstructor.prototype.getName = function(){
            return private[this.id].name;
        }
        PersonConstructor.prototype.getAge = function(){
            return private[this.id].age;
        }
        PersonConstructor.prototype.getPrivate =function(){
            console.log(private);
        }
        return PersonConstructor;
    }()
);

var per = new Person("khoa", 21);
var hien = new Person("hien", 22);

console.log(per);
console.log(hien);
hien.getPrivate();

console.log("IIFE with WeakMap in ES6");

var Animal = (function(){
    var private = new WeakMap();
    var _ = function(instance){return private.get(instance);};
    function AnimalConstructor(n, nl)
    {
        var privateMembers = {name:n, numLegs:nl};
        privateMembers.eat = function()
        {
            console.log("mom mom mom");
        }
        private.set(this, privateMembers);
    }
    AnimalConstructor.prototype.getName = function()
    {
        return _(this).name;
    }
    AnimalConstructor.prototype.getNumLegs = function()
    {
        return _(this).numLegs;
    }
    AnimalConstructor.prototype.setName = function(name)
    {
        _(this).name = name;
    }
    AnimalConstructor.prototype.setNumLegs = function(numLegs)
    {
        _(this).numLegs = numLegs;
    }
    AnimalConstructor.prototype.eat =function()
    {
        _(this).eat();
    }
    return AnimalConstructor;
}()
);

var dog = new Animal("james", 4);
console.log(dog);
console.log(dog.getName());
dog.setName("Tuan");
console.log(dog.getName());
dog.eat();

console.log("Object property in OOP encapsulation: add get, set")

var Employee = (
    function(){
        var private = new WeakMap();
        var _ = function(instance){return private.get(instance)};

        function EmployeeConstructor()
        {
            var privateMembers = {email:""};
            private.set(this, privateMembers);
            this.name = "";
            this.surname ="";
        }
        Object.defineProperty(
            EmployeeConstructor.prototype,
            "fullname",
            {
                get:function(){return this.name+" "+this.surname;},
                set:function(fullname)
                {
                    let arr = fullname.split(" ");
                    // console.log(arr);
                    this.name = arr[0];
                    this.surname = arr[1];
                }
            }
        );
        Object.defineProperty(
            EmployeeConstructor.prototype,
            "email",
            {
                get:function(){return _(this).email},
                set:function(email)
                {
                    let regex = /\w+@\w+\.\w{2,4}/i;
                    if(regex.test(email))
                    {
                        _(this).email = email;
                    }
                    else{
                        throw new Error("Invalid email address!");
                    }
                }
            }
        );
        return EmployeeConstructor;
    }()
);

var em = new Employee();
em.fullname = "khoa nguyen";
em.email = "khoanguyen1507dn@gmail.com";
console.log(em);

var obj = {name: "khoa", 
            get fullName(){return this.name},
            set fullName(name){
                this.name = name;
            }}
console.log(obj);
obj.fullName = "khoa nguyen";
console.log(obj);

var Student = (
    function(){
        "use strict";
        var priv = new WeakMap();
        var _= function(instance){return priv.get(instance);};
        class StudentClass
        {
            constructor(n, cn)
            {
                var privateMembers = {email:"", grade:0};
                priv.set(this, privateMembers);
                this.name = n;
                this.className = cn;
            }
    
            set email(email)
            {
                let regex = /\w+@\w+\.\w{2,4}/i;
                if(regex.test(email))
                {
                    _(this).email = email;
                }
                else{
                    throw new Error("Invalid email address!");
                }
            }
            get email()
            {
                return _(this).email;
            }
            set grade(grade)
            {
                if(grade >=0 && grade <=100)
                    _(this).grade = grade;
                else{
                    throw new Error("Invalid grade!");
                }
            }
            get grade()
            {
                return _(this).grade;
            }
            info()
            {
                console.log("Name: "+ this.name);
                console.log("Class: "+this.className);
                console.log("Email: "+this.email);
                console.log("Grade: "+this.grade);
            }
        }
        return StudentClass;
    }()
);

var stu = new Student("khoa nguyen", "16ES");
stu.email = "khoanguyen1507dn@gmail.com";
stu.grade = 90;

console.log(stu);
stu.info();