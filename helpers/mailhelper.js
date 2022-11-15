const nodemailer=require('nodemailer')
let sendmail=(receiver,text,html,subject)=>{
    let transport=nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dexterak002@gmail.com",
          pass: "stdnibnvukafwxtn",
        }
    })
    let mailOption={
        from:'dexterak002@gmail.com',
        to:receiver,
        subject:subject,
        text:text,
        html:html
    }
    transport.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
        return error.message;
      } else {
        console.log("Email sent: " + info.response);
        return info.response;
      }
    });
}
module.exports={sendmail}