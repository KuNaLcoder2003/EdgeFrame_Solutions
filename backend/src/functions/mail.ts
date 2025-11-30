import nodemailer from "nodemailer"
type mailId = string
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "1.edgeframesolutions@gmail.com",
        pass: `${process.env.PASSWORD}`
    },
    secure: true,
    port: 465
});
const mail = async (emailIds: mailId[], html: string) => {
    const info = await transporter.sendMail({
        from: "1.edgeframesolutions@gmail.com",
        to: emailIds,
        subject: "Meeting for project discussion",
        html: html
    })
    return { info }

}

export default mail