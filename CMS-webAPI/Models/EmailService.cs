using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Configuration;

namespace CMS_webAPI.Models
{
    public class EmailService: IIdentityMessageService
    {
        string _MAIL_FROM = ConfigurationManager.AppSettings["MailFrom"];
        string _MAIL_FROM_PW = ConfigurationManager.AppSettings["MailFromPw"];
        string _SMTP_SERVER = ConfigurationManager.AppSettings["SmtpServer"];
        int _SMTP_PORT = int.Parse(ConfigurationManager.AppSettings["SmtpPort"]);
        static string _REFERER_URL = ConfigurationManager.AppSettings["ReferalUrl"];

        public Task SendAsync(IdentityMessage message)
        {
            MailMessage email = new MailMessage(_MAIL_FROM, message.Destination); 
            email.Subject = message.Subject; 
            email.Body = message.Body; 
            email.IsBodyHtml = true;
            email.Priority = MailPriority.Normal;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = _SMTP_SERVER;
            smtp.EnableSsl = false;
            NetworkCredential NetworkCred = new NetworkCredential(_MAIL_FROM, _MAIL_FROM_PW);
            smtp.UseDefaultCredentials = true;
            smtp.Credentials = NetworkCred;
            smtp.Port = _SMTP_PORT;

            return smtp.SendMailAsync(email);
        }

        public static string getEmailVerifyBody(string userId, string code)
        {
            string callbackUrlFromEmail = _REFERER_URL + "?id=" + userId + "&code=" + code;
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

