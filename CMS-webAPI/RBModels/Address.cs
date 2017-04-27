using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.RBModels
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }

        [MaxLength]
        public string AddressLine1 { get; set; }

        [MaxLength]
        public string AddressLine2 { get; set; }

        [MaxLength]
        public string Country { get; set; }

        [MaxLength]
        public string State { get; set; }

        [MaxLength]
        public string City { get; set; }

        [MaxLength]
        public string Pin { get; set; }

        [MaxLength]
        public string Phone { get; set; }

        [MaxLength]
        public string Email { get; set; }

    }
}