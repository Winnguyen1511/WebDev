var handler = {
    get (target, propertyName)
    {
        console.log("Getting property " + propertyName);
        return target[propertyName];
    },

    set (target, propertyName, value)
    {
        console.log("Assigning value "+value + " to property "+propertyName);
        target[propertyName] = value;
    }
};

// console.log(handler)
class Person {
    constructor(name, surname)
    {
        this.name = name;
        this.surname = surname;
    }
}

// var person = new Person("Victor", "Nguyen");
// var proxiedPerson = new Proxy(person,handler);

// var name = proxiedPerson.name;

// proxiedPerson.name = "Mario";
// console.log(person.name);

//Data binding with proxy:

class Binder
{
    bindTo(dataSourceObj, dataSourceProperties, dataTargetList)
    {
        var bindHandler = {
            set: function(target, property, newValue)
            {
                //find the index of the required property
                //in the dataSourceProperties: ["name", "surname"], etc...
                let i = dataSourceProperties.indexOf(property);
                if(i >= 0)
                {
                    //Change the data in target :person
                    target[dataSourceProperties[i]] = newValue;
                    //Change the data in the view
                    console.log(dataTargetList)
                    dataTargetList[i].obj[dataTargetList[i].prop] = newValue;
                }
            }
        };
        return new Proxy(dataSourceObj, bindHandler);
    }
}

var person = new Person("Victor", "Nguyen");
var txtName = document.getElementById("txtName");
var txtSurname = document.getElementById("txtSurname");

var binder = new Binder();
var proxiedPerson = binder.bindTo(person, 
                                    ["name", "surname"], 
                                    [
                                        {obj: txtName, prop: "value"},
                                        {obj: txtSurname, prop: "value"}
                                    ]);
console.log(proxiedPerson);
proxiedPerson.name = "John";
proxiedPerson.surname = "Nguyen"
// khoa = {
//     _name:"khoa", 
//     _surname:"nguyen"
// }
// Object.defineProperty(khoa, "surname",{
//     get: function(){return khoa["_surname"]},
//     set: function(value){khoa["_surname"]=value;}
// })

// console.log(khoa);

