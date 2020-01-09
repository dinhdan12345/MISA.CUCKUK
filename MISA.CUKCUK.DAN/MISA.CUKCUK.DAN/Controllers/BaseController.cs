using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.BL;
using MISA.BL.Interface;
using MISA.CUKCUK.DAN.Controllers.Interface;

namespace MISA.CUKCUK.DAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController<T> :Controller, IBase<T>
    {
        IBaseBL<T> baseBL = new BaseBL<T>();
        // GET: api/Base
        /// <summary>
        /// Hàm lấy dữ liệu từ Database
        /// </summary>
        /// <returns>dữ liệu customer trong database</returns>
        /// CreatedBy: LDDAN 16/12/2019
        [HttpGet]
        public virtual List<T> GetAllData()
        {
            return baseBL.GetAllData();


        }

        // GET: api/Base/5
        [HttpGet("{id}", Name = "Get")]
        public virtual string Get(int id)
        {
            return "value";
        }

        /// <summary>
        /// Hàm thêm dữ liệu
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// CreatedBY: LDDAN 17/12/2019

        [HttpPost]
        public virtual int Insert(T entity)
        {

            return baseBL.Insert(entity);
        }
        /// <summary>
        /// Hàm update dữ liệu
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customer_client"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        [HttpPost]
        [Route("{id}")]
        public virtual int Update(Guid id, T entity)
        {


            return baseBL.Update(id, entity);
        }
        // PUT: api/Base/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        /// <summary>
        /// Hàm delete customer
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        [HttpDelete]
        [Route("{id}")]
        public virtual int Delete(Guid id)
        {

            return baseBL.Delete(new object[] { id });
        }
    }
}
