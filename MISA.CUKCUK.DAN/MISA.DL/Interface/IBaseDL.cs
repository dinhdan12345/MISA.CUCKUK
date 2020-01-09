using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DL.Interface
{
    public interface IBaseDL<T>
    {

        /// <summary>
        /// Lấy hết dữ liệu từ database đổ ra bảng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LDDAN( 20/12/2019)
        List<T> GetAllData();
        /// <summary>
        /// Thêm dữ liệu
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN( 20/12/2019)
        int Insert(T entity);
        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="id"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN( 20/12/2019)
        int Update(Guid id, T entity);
        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN( 20/12/2019)
        int Delete(object[] sqlParamaters);
        

    }
}
