using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MISA.BL;
using MISA.Entities;
using MISA.BL.Interface;

namespace MISA.CUKCUK.DAN.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CustomerController : BaseController<Customer>
    {
        //BaseBL<Customer> test = new CustomerBL();
        //[HttpGet]
        //public override List<Customer> GetAllData()
        //{
        //    return test.GetAllData();


        //}
    }
}