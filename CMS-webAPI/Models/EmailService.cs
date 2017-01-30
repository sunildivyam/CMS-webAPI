using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CMS_webAPI.Models
{
    public class EmailService: IIdentityMessageService
    {
        string _MAIL_FROM = "sunil.divyam@gmail.com";
        string _MAIL_FROM_PW = "roshanlochi33#";
        string _SMTP_SERVER = "smtp.gmail.com";
        int _SMTP_PORT = 587;
        

        public Task SendAsync(IdentityMessage message)
        {
            MailMessage email = new MailMessage(_MAIL_FROM, message.Destination);
 
            email.Subject = message.Subject;
 
            email.Body = message.Body;
 
            email.IsBodyHtml = true;
            
            var mailClient = new SmtpClient(_SMTP_SERVER, _SMTP_PORT) { 
                Credentials = new NetworkCredential(_MAIL_FROM, _MAIL_FROM_PW), EnableSsl = true };
 
            return mailClient.SendMailAsync(email);
        }

        public static string getEmailVerifyBody(string userId, string code)
        {
            string _REFERER_URL = "http://localhost:82/account/verifyemail";

            string callbackUrlFromEmail = _REFERER_URL = "?userid=" + userId + "&code=" + code;
            string msg = "Please confirm your Email Address by clicking <a href=\""
                   + callbackUrlFromEmail + "\">here</a>";
            return msg;
        }
        
        public static string getEmailVerifySubject()
        {
            return "Confirm your Email Address";
        }
    }
}

