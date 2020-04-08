console.log("Inheritance with Object.create()");
//Actually it create the prototype of an object (e.g. Student)
//by setting its prototype is the other object e.g. new Person(name, ...)
//
var Person = (function(){
    "use strict";
    var priv = new WeakMap();
    var _=function(instance){return priv.get(instance);};
    class PersonClass
    {
        constructor(name, age, num)
        {   
            var privMembers = {phone:num};
            priv.set(this, privMembers);
            this.name = name;
            this.age = age;
        }
        infoPerson()
        {
            console.log("Name: "+ this.name);
            console.log("Age: "+this.age);
            console.log("Phone: "+_(this).phone)
        }
        speak()
        {
            console.log("hello world");
        }
    }
    return PersonClass;
}()
);

var Student = (
    function(){
        "use strict";
        var priv = new WeakMap();
        var _= function(instance){return priv.get(instance);};
        class StudentClass extends Person
        {
            constructor(name, age, num, className, gr)
            {
                super(name, age, num);
                var privMembers = {grade:gr};
                this.className = className;
                priv.set(this, privMembers);
            }
            infoPerson()
            {
                //Call the previous prototype methods:
                Person.prototype.infoPerson.call(this);
                //This methods of Student:
                console.log("Class: "+this.className);
                console.log("Grade: "+_(this).grade);
            }
            get grade()
            {
                return _(this).grade;
            }
            set grade(val)
            {
                if(val >=0 && val <= 100)
                {
                    _(this).grade = val;
                }
                else{
                    throw new Error("Invalid grade!");
                }
            }
        }
        return StudentClass;
    }()
);
//Create an object with prototype is Person
var stu = Object.create(new Person("khoa", 21, "0964865622"));
console.log(stu);
// Student.prototype = new Person("khoa")
// console.log(Student.prototype)
//create a Person object
var stu1 = new Person("hien", "121212121");
console.log(stu1);
// stu.speak();
// stu1.speak();
stu.className = "16ES"; stu.grade = 90;
console.log(stu);

console.log("Test extends")
var stu2 = new Student("khoa", 21, "0964865622", "16ES", 90);
console.log(stu2)
stu2.speak();
stu2.infoPerson();
console.log("Inheritance with apply() and call()");

function NewPerson(name, surname)
{
    this.name = name;
    this.surname = surname;
}
NewPerson.prototype.speak = function()
{
    console.log("hello world");
}
function Developer(name, surname, lang)
{
   
    // NewPerson.apply(this, arguments);
    console.log(arguments);
    this.knowLang = lang;
}
Developer.prototype = Object.create(NewPerson.prototype);
var victor = new Developer("Victor", "Nguyen", "JavaScript");
Developer.prototype.constructor = Developer;
console.log(victor.constructor);

console.log("Test protected members by several implementation:");
var Construction = (
    function(){
        var protectedMembers;
        function countFloor()
        {
            console.log("hello");
        }
        function ConstructionConstructor(floors, protected)
        {
            protectedMembers = protected || {};
            protectedMembers.countFloor = countFloor;
            this.floors = floors;
        }
        return ConstructionConstructor;
    }()
);

function House(floors, material)
{
    var parentProtected ={};
    Construction.call(this, floors, parentProtected);
    this.material = material;
    parentProtected.countFloor();
}

var tmp = new House(4, "concrete");
console.log(tmp);

console.log("Mixin wih objects...");
var nameMixin = {
    capitalize:function()
    {
        let tmp = this.fullname.split(" ");
        for(let i = 0; i < tmp.length; i++)
        {
            tmp[i] = tmp[i].charAt(0).toUpperCase() + tmp[i].slice(1);
        }
        this.fullname = tmp.join(" ");
    }
}
function augment(des, src)
{
    for(var methodName in src)
    {
        if(src.hasOwnProperty(methodName))
        {
            des[methodName] = src[methodName];
        }
    }
    return des;
}

function NewPerson_2(name, surname)
{
    this.name = name;
    this.surname = surname;
    
}
Object.defineProperty(NewPerson_2.prototype,
                    "fullname",{
                        get:function()
                        {
                            return this.name +" "+this.surname;
                        },
                        set:function(fullname)
                        {
                            let tmp = fullname.split(" ");
                            this.name = tmp[0];
                            this.surname = tmp[1];
                        }
                    });

var khoanguyen = new NewPerson_2("khoa", "nguyen");
console.log(khoanguyen);
//Here are the same;
// augment(khoanguyen, nameMixin);
Object.assign(khoanguyen, nameMixin);
console.log(khoanguyen)
khoanguyen.capitalize();
console.log(khoanguyen);

//Other way is implement as function:
function numberMixin(obj)
{
    obj.printNumber = function()
    {
        console.log(this.number);
    }
}
numberMixin(khoanguyen);
console.log(khoanguyen)
