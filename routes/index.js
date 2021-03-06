var express = require('express');
var router = express.Router();

var data = {'0':'0', '1':'1'};

router.get('/', function(req, res, next) {
  // res.send(`
  // <span>Hello there! This is the root URL. These are the end-points:</span>
  //   <ul>
  //   <li>
  //     <form action="/registerDevice" method="post">
  //       <input type="hidden" name="device" value="0" />
  //       <input type="hidden" name="val" value="0" />
  //       <button type="submit">
  //         <strong>POST</strong> <code>/registerDevice (device = 0, val = 0)</code>
  //       </button>
  //     </form>
  //   </li>
  //   <li>
  //     <form action="/updateDevice" method="post">
  //       <input type="hidden" name="device" value="0" />
  //       <input type="hidden" name="val" value="1" />
  //       <button type="submit">
  //         <strong>POST</strong> <code>/updateDevice (device = 0, val = 1)</code>
  //       </button>
  //     </form>
  //   </li>
  //   <li>
  //     <form action="/getStatus/0" method="get">
  //       <input type="hidden" name="device" value="0" />
  //       <button type="submit">
  //         <strong>GET</strong> <code>/getStatus (device = 0)</code>
  //       </button>
  //     </form>
  //   </li>
      
  // </ul>
  // `)
  // console.log(data.length());
  // console.log("final");
  // console.log(data);
  res.render('index', {data: data});

});

router.post("/updateAllDevices", function(req, res){
  // req.body = JSON.parse(JSON.stringify(req.body));
  // console.log(req.body);
  var on = [];
  var s = "";
  for(var i in req.body){
    // console.log(i.slice(7,-1));
    if(!data.hasOwnProperty(i.slice(7))){
      s = s + i.slice(7) + ",";
    }
    else{
      on.push(i.slice(7));
    }
  }
  // console.log(data, on);
  for(var i in data){
    // console.log("a", i, on.includes(i));
    if(on.includes(i)){
      data[i] = '1';
    }
    else{
      data[i] = '0';
    }
  }
  on = [];
  // console.log(data);
  res.status(200).redirect("/");
});

router.post("/registerDevice", function(req, res){
  req.body = JSON.parse(JSON.stringify(req.body));
  if(!req.body.hasOwnProperty("device") && !req.body.hasOwnProperty("val")){
      res.status(409).send(`<span>Invalid Request, try again!</span>`);
      return;
  }
  if(data.hasOwnProperty(req.body.device)){
      res.status(200).send(`<span>Device already registered!</span>`);
      return;
  }
  var device = req.body.device;
  // console.log(device);

  data[device] = req.body.val;
  res.status(200).send(`<span>`+device+` device has been initialized with a value of `+req.body.val);
  // console.log(data);
});

router.post("/updateDevice", function(req, res){
  req.body = JSON.parse(JSON.stringify(req.body));
  // console.log(req.body);
  if(!req.body.hasOwnProperty("device") && !req.body.hasOwnProperty("val")){
      res.status(409).send(`<span>Invalid Request, try again!</span>`);
      return;
  }
  if(!data.hasOwnProperty(req.body.device)){
      res.status(409).send(`<span>Device has not been registered! Try after registering...</span>`);
      return;
  }
  var device = req.body.device;
  // console.log(device);

  data[device] = req.body.val;
  res.status(200).send(`<span>`+device+`'s value has been changed to `+req.body.val);
  // console.log(data);
});

router.get("/getStatus/:device", function(_req, res) {
  res.status(200).send(data[_req.params.device]);
  // console.log(data, " ", data[_req.params.device]);
});


module.exports = router;
