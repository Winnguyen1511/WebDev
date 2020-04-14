class Developer
{
    constructor(name, benifits){
        this.name = name;
        this.benifits = benifits;
    }
}

class Saleman
{
    constructor(name, benifits)
    {
        this.name = name;
        this.benifits = benifits;
    }
}

class Company
{
    constructor(){
        this.employees = [];
    }
    hire(mem)
    {
        this.employees.push(mem);
    }
}

class RecruitmentAgency
{
    constructor(){
        this.objConstructors = {};
    }
    register(role, constructor)
    {
        this.objConstructors[role] = constructor;
    }
    getStaffMember(role, name, benefits)
    {
        var objConstructor = this.objConstructors[role];
        var member;
        if (objConstructor)
            member = new objConstructor(name, benefits);
        return member;
    }
}

let agency = new RecruitmentAgency();
agency.register("dev", Developer);
agency.register("sale", Saleman);

var dev = new Developer("khoa", ["macbook pro"]);
var saler = new Saleman("hien", ["macbook air"]);

let com = new Company();
com.hire(agency.getStaffMember("dev", "khoa",["macbook pro"]));
com.hire(agency.getStaffMember("sale", "hien", ["macbook air"]));

console.log(com)