using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Entities
{
    public class Customer
    {
        private string _customerCode;
        public Guid CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string Tel { get; set; }
        public DateTime? Birthday { get; set; }
        public string CompanyName { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public int Is5FoodMember { get; set; }
        public int Inactive { get; set; }
        public string CustomerCode
        {
            get
            {
                return _customerCode;
            }
            set
            {
                _customerCode = value;
            }
        }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Guid GroupCustomerID { get; set; }
        public int Gender { get; set; }
    }
}
