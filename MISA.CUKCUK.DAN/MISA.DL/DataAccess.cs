using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Resources;
namespace MISA.DL
{
    public class DataAccess:IDisposable
    {
        string conn = @"Data Source=DATABASE\SQL2014;Initial Catalog=MISA.CUKCUK.LDDAN;Integrated Security=True";
        SqlConnection _sqlConnection;
        SqlCommand _sqlCommand;

        public DataAccess()
        {
            _sqlConnection = new SqlConnection(conn);
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlConnection.Open();
        }
        /// <summary>
        /// Hàm naỳ để ngắt kết nối của _sqlConnection mỗi khi đối tượng đó không còn được sử dụng nữa
        /// </summary>
        public void Dispose()
        {
            _sqlConnection.Close();
        }
        /// <summary>
        /// Hàm này để lấy dữ liệu từ database
        /// </summary>
        /// <returns>Lấy dữ liệu trả về đổ ra bảng</returns>
        /// CreatedBy: LDDAN 16/12/2019
        public List<T> GetAllData<T>(string storeName)
        {

            List<T> entities = new List<T>();
            _sqlCommand.CommandText = storeName;

            SqlDataReader sqlDataReader = _sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>(); // tạo một đối tượng mới
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var propertyInfo = entity.GetType().GetProperty(colName);
                    if (propertyInfo != null && colValue != DBNull.Value)
                    {
                        propertyInfo.SetValue(entity, colValue);
                    }
                }
                entities.Add(entity);
            }
            sqlDataReader.Close();

            return entities;
        }
        /// <summary>
        /// Hàm dùng chung cho Delete
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <param name="CustomerCode"></param>
        /// <returns></returns>
        public int DeleteCommon(object[] sqlParamaters,string storeName)
        {
            _sqlCommand.CommandText = storeName;
            SqlCommandBuilder.DeriveParameters(_sqlCommand);
            var pamaters = _sqlCommand.Parameters;
            for (int i = 0; i < pamaters.Count; i++)
            {
                if(i>0)
                {
                    pamaters[i].Value = sqlParamaters[i-1];
                }
            }
            return _sqlCommand.ExecuteNonQuery();
        }
        /// <summary>
        /// Hàm dùng chung cho insert và update
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="id"></param>
        /// <param name="storeName"></param>
        /// CreatedBy: LDDAN(18/12/2019)
        /// <returns></returns>
        public int Insert_Update_Common<T>(T entity,Guid? id ,string storeName)
        {
            _sqlCommand.CommandText = storeName;
            SqlCommandBuilder.DeriveParameters(_sqlCommand);
            var paramaters = _sqlCommand.Parameters;
            foreach (SqlParameter sqlParameter in paramaters)
            {
                var paramName = sqlParameter.ParameterName;
                var propertyInfo = entity.GetType().GetProperty(paramName.Replace("@", string.Empty));
                if (propertyInfo != null)
                {
                    var propertyValue = propertyInfo.GetValue(entity);
                    switch (propertyInfo.Name)
                    {
                        case "CreatedDate":
                            sqlParameter.Value = propertyValue != null ? propertyValue : DateTime.Now;
                            break;
                        case "ModifiedDate":
                            sqlParameter.Value = propertyValue != null ? propertyValue : DateTime.Now;
                            break;
                        case "Birthday":
                            sqlParameter.Value = propertyValue != null ? propertyValue : DBNull.Value;
                            break;
                        case "CustomerID":
                            sqlParameter.Value = id;
                            break;
                        default:
                            sqlParameter.Value = propertyValue != null ? propertyValue : string.Empty;
                            break;
                    }


                }
            }
            return _sqlCommand.ExecuteNonQuery();
        }

        /// <summary>
        /// Hàm thêm dữ liệu 
        /// 
        /// </summary>
        /// CreatedBy: LDDAN 16/12/2019

        public int Insert<T>(T entity, string storeName)
        {
            return Insert_Update_Common(entity, null,storeName);

        }
        /// <summary>
        /// Hàm update dữ liệu
        /// </summary>
        /// <param name="customer"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        /// Trả về dữ liệu đã được update 
        /// CreatedBy: LDDAN ( 17/12/2019)
        public int Update<T>(T entity, Guid id, string storeName)
        {
            return Insert_Update_Common(entity, id, storeName);

        }
        /// <summary>
        /// Hàm delete dữ liệu theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: LDDAN 17/12/2019
        public int Delete(object[] sqlParamater, string storeName) 
        {
            return DeleteCommon(sqlParamater, storeName);

        }
    }
}
