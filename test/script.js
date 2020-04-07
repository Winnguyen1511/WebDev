//Abstraction:
console.log("Abstraction: ")
class Company{
    constructor(name)
    {
        var employees = [];
        this.name = name;
        this.showName = function()
        {
            console.log(this.name);
        }
    }

    getEmployees()
    {
        return employees;
    }
    addEmployees(emp)
    {
        employees.push(emp);
    }
    showEmployees()
    {
        for(let i = 0; i < employees.length; i++)
        {
            console.log(employees[i]+"\n");
        }
    }
    show()
    {
        console.log("hello world");
    }
}
// function Company(name)
// {
//     var employees = [];
//     this.name = name;
//     this.getEmployees= function()
//     {
//         return employees;
//     }
//     this.addEmployees=function(emp)
//     {
//         employees.push(emp);
//     }
//     this.showEmployees=function()
//     {
//         for(let i = 0; i < employees.length; i++)
//         {
//             console.log(employees[i]+"\n");
//         }
//     }
// }
var com = new Company("CPCIT");
// com.addEmployees("khoa");
// com.addEmployees("hien");
// // com.employees = "this is a jokes";
// com.showEmployees();
console.log(com);
Company.prototype.showList = function()
{
    console.log("hello world");
}
// com.show();


//Inheritance-subclassing
console.log("Inheritance-Subclassing: ");
// class Person
// {
//     constructor(name, age)
//     {
//         this.name = name;
//         this.age = age;
//     }
// }
// class Programmer extends Person
// {
//     constructor(name, age, lang)
//     {
//         super(name, age);
//         this.knownLang = lang;
//     }
// }
function Person(name, age)
{
    this.name= name;
    this.age = age;
}
function Programmer(lang)
{
    this.knownLang = lang;
}
// Programmer.prototype = new Person(kh)
// Programmer.prototype = new Person("khoa", 21);
// console.log(Programmer.prototype)
Programmer.prototype = new Person("khoa", 21);
// console.log(Programmer.prototype);
// var me = new Programmer("khoa", 21, "JavaScript");
var me = new Programmer("JavaScript");
// me.prototype.constructor = Programmer;
console.log(me);

//Polymophism:
console.log("Polymophism: ");


