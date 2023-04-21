var express = require('express');
var router = express.Router();
const ejs=require('ejs');

var mongojs = require('mongojs')
var cString="mongodb+srv://madhu:madhu@cluster0.y34pj1v.mongodb.net/?retryWrites=true&w=majority"
var db = mongojs(cString, ['customer','retailer','gros','Yretailer','Zretailer','orders','accord'])

router.post('/ccreate',async(req,res)=>{
    try{
        const id=req.body.cname;
        console.log(id);
        const UserJson={
            name:req.body.cname,
            phoneNo:req.body.cphone,
            password:req.body.c_crt_pass,
            age:req.body.cage,
            gender:req.body.cgender,
            email:req.body.cemail,
            address:req.body.cadd
        }
        db.customer.insert(UserJson,function(err,docs){
            if(err){
                console.log(err);
            }
            else{
                console.log(docs);
                res.render('ccreate')
            }
        })
    }
    catch(error){
        res.json("hello");
    }
})

router.post('/order',async (req,res)=>{
    try{
        const id=req.body.cus;
        const id1=req.body.bel;
        //console.log(id1);
        var UserJson={
            custName:id,
            prodName:req.body.pronam,
            retName:req.body.rettname,
            quantit:req.body.quanti,
            role:req.body.bel
        }
        //console.log(UserJson);
        if(req.body.bel=="veggies"){
            db.orders.insert(UserJson,function(err,docs){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(docs);
                    res.render('order')
                }
            })
        }
        if(req.body.bel=="handloom"){
            db.orders.insert(UserJson,function(err,docs){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(docs);
                    res.render('order')
                }
            })
        }
        if(req.body.bel=="pottrey"){
            db.orders.insert(UserJson,function(err,docs){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(docs);
                    res.render('order')
                }
            })
        }
        
    }
    catch(err){
        console.log(err);
    }
})

router.post('/Yrcreate',async(req,res)=>{
    try{
        const id=req.body.rname;
        console.log(id);
        const UserJso={
            name:req.body.yrname,
            phoneNo:req.body.yrphone,
            password:req.body.yr_crt_pass,
            age:req.body.yrage,
            gender:req.body.yrgender,
            homeaddress:req.body.yrhomeadd,
            farmaddress:req.body.yrfarmadd,
            city:req.body.yrcity,
            district:req.body.yrdist,
            state:req.body.yrstate,
            country:req.body.yrcountry
        }
        db.Yretailer.insert(UserJso,function(err,docs3){
            if(err){
                console.log(err);
            }
            else{
                console.log(docs3);
                res.render('Yrcreate');
            }
        })
    }
    catch(error){
        res.json("hello");
    }
})

router.post('/Zrcreate',async(req,res)=>{
    try{
        const id=req.body.rname;
        console.log(id);
        const UserJso={
            name:req.body.zrname,
            phoneNo:req.body.zrphone,
            password:req.body.zr_crt_pass,
            age:req.body.zrage,
            gender:req.body.zrgender,
            homeaddress:req.body.zrhomeadd,
            farmaddress:req.body.zrfarmadd,
            city:req.body.zrcity,
            district:req.body.zrdist,
            state:req.body.zrstate,
            country:req.body.zrcountry
        }
        db.Zretailer.insert(UserJso,function(err,docs3){
            if(err){
                console.log(err);
            }
            else{
                console.log(docs3);
                res.render('Zrcreate');
            }
        })
    }
    catch(error){
        res.json("hello");
    }
})

router.post('/rcreate',async(req,res)=>{
    try{
        const id=req.body.rname;
        console.log(id);
        const UserJson={
            name:req.body.rname,
            phoneNo:req.body.rphone,
            password:req.body.r_crt_pass,
            age:req.body.rage,
            gender:req.body.rgender,
            homeaddress:req.body.rhomeadd,
            farmaddress:req.body.rfarmadd,
            city:req.body.rcity,
            district:req.body.rdist,
            state:req.body.rstate,
            country:req.body.rcountry
        }
        db.retailer.insert(UserJson,function(err,docs){
            if(err){
                console.log(err);
            }
            else{
                console.log(docs);
                res.render('rcreate')
            }
        })
    }
    catch(error){
        res.json("hello");
    }
})


router.post('/custSignIn1',async function(req,res){
    var id1=req.body.cust_name;
    // var password=req.body.cust_pass;
    console.log(id1);
    let test = db.customer;
    let test1 = db.gros;

    var l=new Array();

    let promiseOfFind = test.find({name:id1}).toArray((err, docs) => {
        if(docs.length!=0){
            var a1=docs[0].name;
            var a2=docs[0].phoneNo;
            var a3=docs[0].address;
            let f= test1.find().toArray((err,docs1)=>{
                res.render('custSignIn1',{Name:a1,phoneNo:a2,address:a3,l2:docs1});
            })
        }
    })

})


router.post('/retSignIn1',async function(req,res){
    var id1=req.body.rname
    var pwd=req.body.rpass
    //console.log(id);
    let test = db.retailer;
    let test1 = db.gros;
    let test2=db.orders;
    //console.log(test);
    var l=new Array();
    let promiseOfFind = test.find({name:id1,password:pwd}).toArray((err, docs) => {
            if(docs.length!=0){
                var a1= docs[0].name;
                var a2= docs[0].phoneNo;
                var a3= docs[0].farmaddress;
                //l.push({fname:a1,fage:a2,ffadd:a3})
                //console.log(l);
                let f= test1.find({name:id1}).toArray((err,docs1)=>{
                    var s="";
                    if(docs1.length==0){
                        s="no products added fill the form to add "
                    }
                    let f1= test2.find({retName:id1}).toArray((err,docs2)=>{
                        //console.log(docs2)
                        res.render('retSignIn1',{Name:a1,phoneNo:a2,farmaddress:a3,l2:docs1,s:s,l3:docs2});

                    })
                    //console.log(docs1);
    

                })

            }
            // else{
            //     res.send("No farmer details please sign up ");
            // }
    })
        
})
router.post('/accorders',async (req,res)=>{
    var id1=req.body.pp;
    var id2=req.body.qq;
    var id3=req.body.rr;
    var id4=req.body.cc;
    
    var test=db.gros;
    var test1=db.orders;
    var test2=db.accord;
    var test3=db.rejord;
    var res1, a, a1, a2, a3;
    let  promiseOfFind = test.find({name:id3}).toArray(async (err, docs) => {
        if(await docs.length!=0){
            for( var i=0;i<docs.length;i++){
                if(docs[i].grname.l.prodname==id1){
                    res1=docs[i]._id;
                    a=docs[i].grname.l.quantity;
                    a1=docs[i].grname.l.prodname;
                    a2=docs[i].grname.l.link;
                    a3=docs[i].grname.l.price;
                }
            }
            console.log(res1);
            console.log(typeof a);
            console.log(typeof id2);

             if( await parseInt(a) >= parseInt(id2) ){
                console.log(a)
                console.log(typeof id2)
                test.update({_id:res1},{$set:{name:id3,grname:{l:{prodname:a1,quantity:a-id2,link:a2,price:a3}}}})  
                var user={
                                    custName:id4,
                                    prodName:id1,
                                    quantit:id2,
                                    retName:id3
                                }
                                test2.insert(user,async function(err,docs1){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(docs1);
                                    }
                                    await test1.remove({custName:id4,prodName:id1,quantit:id2,retName:id3});
                                 })  
                                 res.send("Accepted order successfully")
            }
            else if (await a<id2){
                var user={
                    custName:id4,
                    prodName:id1,
                    quantit:id2,
                    retName:id3
                }
                await test3.insert(user,async function(err,docs1){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(docs1);
                    }
                   await  test1.remove({custName:id4,prodName:id1,quantit:id2,retName:id3});
                    })
                    res.send("rejected the order")
            }
            else{
             res.send("sucess");}
        }
            
    
         else{
            res.send("hello")
         }
     })

})
router.post('/orderstat',async function(req,res){
    var id1=req.body.cus1;
    var test=db.accord;
    var test1=db.rejord;
    var test2=db.orders;
    let promiseOfFind = test.find({custName:id1}).toArray((err, docs) => {
        console.log(docs);
        let ff = test1.find({custName:id1}).toArray((err, docs1) => {
            //console.log(docs1);
                let ff1=test2.find({custName:id1}).toArray((err, docs2) => {
                    //console.log(docs2);
                    res.render('orderstat',{accc:docs,rejj:docs1,pend:docs2})
                })
        })
    })

})


    router.post('/YretSignIn1',async function(req,res){
        var id1=req.body.y1rname
        var pwd=req.body.y1rpass
        console.log(id1);
        let test = db.Yretailer;
        let test1 = db.gros;
        let test2=db.orders;
        //console.log(test);
        var l=new Array();
        let promiseOfFind = test.find({name:id1,password:pwd}).toArray((err, docs) => {
                if(docs.length!=0){
                    var a1= docs[0].name;
                    var a2= docs[0].phoneNo;
                    var a3= docs[0].farmaddress;
                    //l.push({fname:a1,fage:a2,ffadd:a3})
                    //console.log(l);
                    let f= test1.find({name:id1}).toArray((err,docs1)=>{
                        var s="";
                        if(docs1.length==0){
                            s="no products added fill the form to add "
                        }
                        
                        //console.log(docs1);
                        let f1= test2.find({retName:id1}).toArray((err,docs2)=>{
                            res.render('YretSignIn1',{Name:a1,phoneNo:a2,farmaddress:a3,l2:docs1,s:s,l3:docs2});
                        })
                    })
    
                }
                else{
                    res.send("No farmer details please sign up ");
                }
            })
            
        })


        router.post('/ZretSignIn1',async function(req,res){
            var id1=req.body.z1rname
            var pwd=req.body.z1rpass
            //console.log(id1);
            let test = db.Zretailer;
            let test1 = db.gros;
            let test2=db.orders;
            //console.log(test);
            var l=new Array();
            let promiseOfFind = test.find({name:id1,password:pwd}).toArray((err, docs) => {
                    if(docs.length!=0){
                        var a1= docs[0].name;
                        var a2= docs[0].phoneNo;
                        var a3= docs[0].farmaddress;
                        //l.push({fname:a1,fage:a2,ffadd:a3})
                        //console.log(l);
                        let f= test1.find({name:id1}).toArray((err,docs1)=>{
                            var s="";
                            if(docs1.length==0){
                                s="no products added fill the form to add "
                            }
        
                            //console.log(docs1);
                            let f1= test2.find({retName:id1}).toArray((err,docs2)=>{
                                res.render('ZretSignIn1',{Name:a1,phoneNo:a2,farmaddress:a3,l2:docs1,s:s,l3:docs2});
                            })
        
                        })
        
                    }
                    else{
                        res.send("No farmer details please sign up ");
                    }
                })
                
            })

   
    //await console.log(promiseOfFind);
router.post('/retSignIn2',async function(req,res){
    var id1=req.body.f1name;
    let test1 = db.gros;
    let f= test1.find({name:id1}).toArray((err,docs1)=>{
            var grname=req.body.gname;
            var l={
                prodname:req.body.gname,
                link:req.body.photo,
                quantity:req.body.quant,
                price:req.body.price
            }
            var UserJson={
                name:id1,
                grname:{l}
            }
            test1.insert(UserJson,function(err,docs2){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(docs2);
                    res.send("successfully added details");
                }
            })
        // else{
        //     var l1={
        //         prodname:req.body.gname,
        //         link:req.body.photo,
        //         quantity:req.body.quant,
        //         price:req.body.price
        //     }
        //     var l=test1.find({name:id1}).toArray((err, docs) => {
        //         //var l=docs.pro
        //         var l=docs[0].pro.add();

        //         console.log(l);
        //         test1.update({"name":id1},{$set:{"pro":docs[0].pro.add(l1)}})
        //         console.log(docs);
        //     })
            
            
             
        // }
        //console.log(docs1.length);})
})
})
router.post('/YretSignIn2',async function(req,res){
    var id1=req.body.f11name;
    let test1 = db.gros;
    let f= test1.find({name:id1}).toArray((err,docs1)=>{
            var grname=req.body.gname;
            var l={
                prodname:req.body.gname,
                link:req.body.photo,
                quantity:req.body.quant,
                price:req.body.price
            }
            var UserJson={
                name:id1,
                grname:{l}
            }
            test1.insert(UserJson,function(err,docs2){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(docs2);
                    res.send("successfully added details");
                }
            })
        })
})

router.post('/ZretSignIn2',async function(req,res){
    var id1=req.body.f13name;
    let test1 = db.gros;
    let f= test1.find({name:id1}).toArray((err,docs1)=>{
            var grname=req.body.gname3;
            var l={
                prodname:req.body.gname3,
                link:req.body.photo3,
                quantity:req.body.quant3,
                price:req.body.price3
            }
            var UserJson={
                name:id1,
                grname:{l}
            }
            test1.insert(UserJson,function(err,docs2){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(docs2);
                    res.send("successfully added details");
                }
            })
        })
})
    
router.post("/delete",(req,res)=>{
    let test1 = db.gros;
    let id1=req.body.f2name;
    let groname=req.body.delname;
    //console.log(groname);
    let f= test1.find({name:id1}).toArray((err,docs1)=>{
        for(var i=0;i<docs1.length;i++){
            if(groname == docs1[i].grname.l.prodname){
                var d= docs1[i]._id;
                //console.log(docs1[i]);
                //console.log(d);
                test1.remove({"_id": d});
                res.render("delete");
            }
            // console.log(docs1[i].grname.l.prodname);
        }
        //console.log(docs1[0]);
    })

})
router.post("/Ydelete",(req,res)=>{
    let test1 = db.gros;
    let id1=req.body.f22name;
    let groname=req.body.delname2;
    //console.log(groname);
    let f= test1.find({name:id1}).toArray((err,docs1)=>{
        for(var i=0;i<docs1.length;i++){
            if(groname == docs1[i].grname.l.prodname){
                var d= docs1[i]._id;
                //console.log(docs1[i]);
                //console.log(d);
                test1.remove({"_id": d});
                res.render("Ydelete");
            }
            // console.log(docs1[i].grname.l.prodname);
        }
        //console.log(docs1[0]);
    })

})

router.post("/Zdelete",(req,res)=>{
    let test1 = db.gros;
    let id1=req.body.f23name;
    let groname=req.body.delname3;
    //console.log(groname);
    let f= test1.find({name:id1}).toArray((err,docs1)=>{
        for(var i=0;i<docs1.length;i++){
            if(groname == docs1[i].grname.l.prodname){
                var d= docs1[i]._id;
                //console.log(docs1[i]);
                //console.log(d);
                test1.remove({"_id": d});
                res.render("Zdelete");
            }
            // console.log(docs1[i].grname.l.prodname);
        }
        //console.log(docs1[0]);
    })

})


router.get('/',function(req,res,next){
    res.render('nindex',{title:'Farm to Table'})
})
router.get('/custindex',function(req,res,next){
    res.render('custindex',{title:'Farm to Table'})
})

router.get('/login',(req,res,next)=>{
    res.render('login');
})
router.get('/Ylogin',(req,res,next)=>{
    res.render('Ylogin');
})
router.get('/Zlogin',(req,res,next)=>{
    res.render('Zlogin');
})
router.get('/custSignUp',(req,res,next)=>{
    res.render('custSignUp');
})

router.get('/retSignUp',(req,res,next)=>{
    res.render('retSignUp');
})
router.get('/YretSignUp',(req,res,next)=>{
    res.render('YretSignUp');
})
router.get('/ZretSignUp',(req,res,next)=>{
    res.render('ZretSignUp');
})


router.get('/custSignIn',(req,res,next)=>{
    res.render('custSignIn');
})

router.get('/retSignIn',(req,res,next)=>{
    res.render('retSignIn');
})
router.get('/YretSignIn',(req,res,next)=>{
    res.render('YretSignIn');
})
router.get('/ZretSignIn',(req,res,next)=>{
    res.render('ZretSignIn');
})

module.exports=router;