const nodemailer=require('nodemailer');


const sendMail=async (to,attachments)=>{
    const transport=nodemailer.createTransport({
        auth:{
            pass:'uexrococsdmayqmh',
            user:'dexterak002@gmail.com'
        },
        host:'smtp.gmail.com',
        port:465,
        secure:true
    })

    try {
        await transport.sendMail({
          from: "dexterak002@gmail.com",
          subject: "test",
          to,
          attachments
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={sendMail}