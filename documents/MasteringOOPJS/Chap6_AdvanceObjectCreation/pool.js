class PersonalTrainers
{
    constructor()
    {
        this.name = "trainer";
    }
    show(){
        console.log("show");
    }
    explain(){
        console.log("explain");
    }
    exercise(){
        console.log("exercise");
    }
}
var ObjectPool = (
    function(){
        var instance;
        var objConstructor;
        var objPool = [];
        class ObjectPoolClass
        {
            constructor(objConstr)
            {
                if(!instance)
                {
                    objConstructor = objConstr;
                    instance = this;
                }
                return instance;
            }
            getobj(){
                var obj;
                if(objPool.length == 0)
                {
                    obj = new objConstructor();
                }
                else{
                    obj = objPool.pop();
                }
                return obj;
            }
            recycle(obj)
            {
                console.log(objConstructor == PersonalTrainers);
                objPool.push(obj);
            }
        }
        return ObjectPoolClass;
    }()
);



var trainerPool = new ObjectPool(PersonalTrainers);
var t1 = trainerPool.getobj();
var t2 = trainerPool.getobj();
console.log(t1);
console.log(t2);
trainerPool.recycle(t1);
trainerPool.recycle(t2);
console.log(trainerPool);
var t3 = trainerPool.getobj();

console.log(t3);
console.log(t2 == t3);