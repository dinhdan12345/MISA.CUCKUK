using MISA.DL;
using System;
using System.Collections.Generic;
using System.Text;
using MISA.BL.Interface;
using MISA.DL.Interface;

namespace MISA.BL
{
    public class BaseBL<T>:IBaseBL<T>
    {
        IBaseDL<T> baseDL = new BaseDL<T>();
        /// <summary>
        /// Hàm này để lấy dữ liệu từ database customer
        /// </summary>
        /// <returns>Lấy dữ liệu trả về đổ ra bảng</returns>
        /// CreatedBy: LDDAN 16/12/2019
        public virtual List<T> GetAllData()
        {
            return baseDL.GetAllData();
        }

        /// <summary>
        /// Hàm thêm dữ liệu customer
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// CreatedBY: LDDAN 17/12/2019
        /// 
        public int Insert(T entity)
        {

            return baseDL.Insert(entity);
        }
        /// <summary>
        /// Hàm update dữ liệu customer
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customer_client"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        public int Update(Guid id, T entity)
        {

            return baseDL.Update(id, entity);
        }
        /// <summary>
        /// Hàm delete customer
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        public int Delete(object[] sqlParamaters)
        {
            return baseDL.Delete(sqlParamaters);
        }
    }
}
