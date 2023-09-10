import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from "nodemailer";
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {

    private transporter: Transporter;

    constructor(private readonly configService: ConfigService){
        this.transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'loteriapp.dev@gmail.com',
                pass: configService.get<string>("NODEMAILER_PASSWORD")
            }
        });
    }

    sendEmailVarificationCode(userEmail: string, verificationCode: string){

        const mailOptions = {
            from: this.configService.get<string>("NODEMAILER_EMAIL"),
            to: userEmail,
            subject: 'Email Verification Code',
            text: 'Verification Code: ' + verificationCode,
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log("info: ", info);
                return true;
            }
        });

    }

}
