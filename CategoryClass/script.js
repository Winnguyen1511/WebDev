let arr = [];
// arr.push(new Watch(""))
let tmpName = "ĐỒNG HỒ SEIKO SGEG99P1 NAM PIN DÂY DA";
let tmpPrice = 3684;
let tmpCate = Watch.prototype.CATEGORY.male;
let tmpFeature = new Feature(Feature.prototype.POWER.battery,
                            Feature.prototype.MATERIAL.leather,
                            Feature.prototype.CRYSTAL.sapphire,
                            3)
let tmpBrand = "Seiko";
let tmpCode = "SGEG99P1";

let seiko_1 = new Watch(tmpName, tmpPrice, tmpCate,
                        tmpFeature, tmpBrand, tmpCode);

console.log(seiko_1);

/*
Watch in JSON:
The object is looks like this:
{
    name:"name is here",
    price:3684,
    category:"male",
    feature :{
                power:0,
                material: "Leather",
                crystal:"Shapphire",
                waterResistance:3
            },
    brand:"Seiko",
    code:"SGEG99P1"
}

These object canbe used anywhere needed JSON data.
*/
