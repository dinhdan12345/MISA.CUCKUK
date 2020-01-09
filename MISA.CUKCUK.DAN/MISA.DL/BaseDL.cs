using System;
using System.Collections.Generic;
using System.Text;
using MISA.DL.Interface;
namespace MISA.DL
{
    public class BaseDL<T>:IBaseDL<T>
    {
        /// <summary>
        /// Hàm này để lấy dữ liệu từ database Customer
        /// </summary>
        /// <returns>Lấy dữ liệu trả về đổ ra bảng</returns>
        /// CreatedBy: LDDAN 16/12/2019
        public virtual List<T> GetAllData()
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                var entity = Activator.CreateInstance<T>();
                var storeName = entity.GetType().Name;
                return dataAccess.GetAllData<T>(string.Format("[dbo].[proc_Get{0}s]",storeName));
            }


        }
        /// <summary>
        /// Hàm thêm dữ liệu customer
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBY: LDDAN 17/12/2019
        public int Insert(T entity)
        {
            using (DataAccess dataAccess = new DataAccess())
            {
                var storeName = entity.GetType().Name;
                return dataAccess.Insert(entity,string.Format("[dbo].[proc_Insert_{0}]", storeName));
            }
        }
        /// <summary>
        /// Hàm update dữ liệu Customer
        /// </summary>
        /// <param name="id"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        public int Update(Guid id, T entity)
        {

            using (DataAccess dataAccess = new DataAccess())
            {
                var storeName = entity.GetType().Name;
                return dataAccess.Update(entity, id, string.Format("[dbo].[proc_Update_{0}]", storeName));
            }
        }
        /// <summary>
        /// Hàm delete customer
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        public int Delete(object[] sqlParamaters)
        {
            var entity = Activator.CreateInstance<T>();
            var storeName = entity.GetType().Name;
            using (DataAccess dataAccess = new DataAccess())
            {
                return dataAccess.Delete(sqlParamaters,string.Format("[dbo].[proc_Delete_{0}]",storeName) );
            }
        }
    }
}
