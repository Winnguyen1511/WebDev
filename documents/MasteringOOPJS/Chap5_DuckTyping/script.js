//Test the type before use with object:
let Student = (
    function(){
        var priv = new WeakMap();
        var _ = function(instance){return priv.get(instance);};
        class StudentClass 
        {
            constructor(name, age, grade)
            {
                var privateMembers =  {grade: grade}
                priv.set(this, privateMembers)
                this.name = name;
                this.age = age;
                
            }
            get grade() {
                return _(this).grade;
            }
            set grade(val)
            {
                if(val >= 0 && val <= 100){
                    _(this).grade = val;
                }
            }
        }
        return StudentClass;
    }()
);


var victor = new Student('khoa', 21, 90);


class Interface 
{
    constructor(name, methods=[], properties = [])
    {
        this.name = name;
        this.methods = [];
        this.properties = [];
        for(let i = 0; i < methods.length ; i++)
        {
            if(typeof methods[i] !== 'string')
            {
                throw new Error("Interface constructor expects method names\
                                to be passed as a string.");
            }
            this.methods.push(methods[i]);

        }

        for(let i = 0; i < properties.length; i++)
        {
            if(typeof properties[i] !== 'string')
            {
                throw new Error("Interface constructor expects properties names\
                                    to be passed as a string.");
            }
            this.properties.push(properties[i]);
        }
    }
    isImplementedBy(obj)
    {
        var methodsLen = this.methods.length;
        var propertiesLen = this.properties.length;
        var currentMember;
        if(obj)
        {
            for(let i = 0; i < methodsLen; i++)
            {
                currentMember = this.methods[i];
                if(!obj[currentMember] || !(obj[currentMember] instanceof Function))
                {
                    throw new Error("The object does not implement the\
                    interface "+this.name+". Method "+ currentMember + " not found");
                }

            }
            for(let i = 0; i < propertiesLen; i++)
            {
                currentMember = this.properties[i];
                if(!obj[currentMember] || (obj[currentMember] instanceof Function))
                {
                    throw new Error("The object does not implement the\
                    interface "+this.name+". Property "+ currentMember + " not found");
                }
            }
        }
        else{
            throw new Error("No object to check!");
        }
    }
}
var IWritecode = new Interface("IWritecode", ["writeCode"], ["name"]);
var School = (
    function() {
        function implementMethod(obj, method)
        {
            return (obj && obj[method] && obj[method] instanceof Function);
        }
        function implementProperty(obj, property)
        {
            return (obj && obj[property] && !(obj[property] instanceof Function))
        }
        class SchoolClass 
        {
            constructor()
            {
                this.listStu = [];
            }
            addStudent(stu)
            {
                // if(stu instanceof Student)
                // if(implementMethod(stu, "writeCode"))
                // {
                //     this.listStu.push(stu);
                // }
                // else{
                //     throw new Error("This School only admits students that write code!");
                // }
                IWritecode.isImplementedBy(stu);
                this.listStu.push(stu);
            }
            createSoftware() {
                
                var newSoftware =[];
                var stu;
                var module;
                for(let i = 0; i < this.listStu.length; i++)
                {
                    stu = this.listStu[i];
                    module = stu.writeCode();
                    newSoftware.push(module);
                }
                return newSoftware;
            }
        }
        return SchoolClass;
    }()
);



var tables = {legs:4, colors:'yellow'};
var school = new School();
// school.addStudent(tables)
victor.writeCode = function()
{
    return {prog: "helloworld.c", lang:"C"};
}
school.addStudent(victor);console.log(school)
var hien = new Student("hien", 22, 95);
hien.writeCode = function(){
    return {prog: "helloworld.js", lang:"JavaScript"};
}
school.addStudent(hien);
console.log(school);

//