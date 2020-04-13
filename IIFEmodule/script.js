let funModule = (
    function(){
        function funModuleConstructor() {
            this.isCuteMixin = function(obj)
            {
                obj.isCute = function()
                {
                    return true;
                }
            }
            this.singMixin = function(obj)
            {
                obj.sing = function()
                {
                    console.log("Singing to an awesome tune");
                }
            }
        }
        
        return new funModuleConstructor();
    }()   
);

let tmp = {name: "khoa", age:21};
console.log(funModule);
funModule.isCuteMixin(tmp)
funModule.singMixin(tmp)
console.log(tmp)

function myMixin()
{
    this.add = function(a,b)
    {
        return a + b;
    }
    this.minus = function(a,b)
    {
        return a - b;
    }
}
console.log(new myMixin())